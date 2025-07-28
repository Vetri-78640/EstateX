// Encryption utility for localStorage as i'm a one who is concerned about security but also want to keep it simple for now!
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

// Simple encryption function (for demo purposes only but stil will see if its fine or not man!
// In production, use a more robust encryption library like crypto-js but maybe will not go that great man!
export const encryptData = (data) => {
  try {
    const jsonString = JSON.stringify(data);
    // Simple base64 encoding with a custom key but it's a basic thing so yeah!
    const encoded = btoa(jsonString + ENCRYPTION_KEY);
    return encoded;
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};

export const decryptData = (encryptedData) => {
  try {
    if (!encryptedData) return null;
    // Check if data is base64 encoded (encrypted) and i think its cool!
    const isBase64 = /^[A-Za-z0-9+/]*={0,2}$/.test(encryptedData);
    if (isBase64) {
      try {
        // Try to decrypt as base64 which we have it stored in .env
        const decoded = atob(encryptedData);
        // Check if it contains our encryption key
        if (decoded.includes(ENCRYPTION_KEY)) {
          const jsonString = decoded.replace(ENCRYPTION_KEY, '');
          return JSON.parse(jsonString);
        } else {
          // Base64 but no key - might be old format
          console.warn('Base64 data found but no encryption key');
          return null;
        }
      } catch (base64Error) {
        console.warn('Failed to decode base64:', base64Error);
        return null;
      }
    } else {
      // Handle existing unencrypted data (backward compatibility)
      try {
        return JSON.parse(encryptedData);
      } catch (parseError) {
        console.warn('Failed to parse existing data:', parseError);
        return null;
      }
    }
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};

// Migrate existing unencrypted data to encrypted format
const migrateExistingData = (key) => {
  try {
    const rawData = localStorage.getItem(key);
    if (!rawData) return;
    
    // Check if data is not already encrypted (not base64)
    const isBase64 = /^[A-Za-z0-9+/]*={0,2}$/.test(rawData);
    
    if (!isBase64) {
      try {
        const parsedData = JSON.parse(rawData);
        const encrypted = encryptData(parsedData);
        if (encrypted) {
          localStorage.setItem(key, encrypted);
          console.log(`Migrated ${key} to encrypted format`);
        }
      } catch (error) {
        console.warn(`Failed to migrate ${key}:`, error);
      }
    }
  } catch (error) {
    console.error(`Migration error for ${key}:`, error);
  }
};

// Migration function to handle existing shared data
const migrateSharedDataToUserSpecific = (userId) => {
  try {
    // Check if there's old shared data
    const oldSharedData = localStorage.getItem("myProperties");
    if (oldSharedData) {
      console.log('Found old shared data, migrating to user-specific storage...');
      
      // Try to decrypt/parse the old data
      let parsedData = null;
      try {
        parsedData = decryptData(oldSharedData);
      } catch (error) {
        try {
          parsedData = JSON.parse(oldSharedData);
        } catch (parseError) {
          console.warn('Could not parse old shared data');
          return;
        }
      }
      
      if (parsedData && Array.isArray(parsedData)) {
        // Save the old data to the current user's storage
        secureStorage.setItem("myProperties", parsedData, userId);
        console.log(`Migrated ${parsedData.length} properties to user ${userId}`);
        
        // Remove the old shared data
        localStorage.removeItem("myProperties");
        console.log('Removed old shared data');
      }
    }
  } catch (error) {
    console.error('Migration error:', error);
  }
};

// User-specific storage key generator
// This function generates a unique key for each user based on their ID
const getUserStorageKey = (baseKey, userId) => {
  if (!userId) {
    console.warn('No user ID provided, using fallback key');
    return baseKey;
  }
  return `${baseKey}_user_${userId}`;
};

// Secure localStorage wrapper with user isolation
export const secureStorage = {
  setItem: (key, value, userId = null) => {
    try {
      const userKey = getUserStorageKey(key, userId);
      const encrypted = encryptData(value);
      if (encrypted) {
        localStorage.setItem(userKey, encrypted);
      }
    } catch (error) {
      console.error('Secure storage set error:', error);
    }
  },

  getItem: (key, userId = null) => {
    try {
      const userKey = getUserStorageKey(key, userId);
      
      // If this is a logged-in user, check for migration
      if (userId) {
        migrateSharedDataToUserSpecific(userId);
      }
      
      // Migrate existing data if needed
      migrateExistingData(userKey);
      
      const encrypted = localStorage.getItem(userKey);
      const result = encrypted ? decryptData(encrypted) : null;
      return result;
    } catch (error) {
      console.error('Secure storage get error:', error);
      return null;
    }
  },

  removeItem: (key, userId = null) => {
    try {
      const userKey = getUserStorageKey(key, userId);
      localStorage.removeItem(userKey);
    } catch (error) {
      console.error('Secure storage remove error:', error);
    }
  },

  clear: (userId = null) => {
    try {
      if (userId) {
        // Clear only user-specific data
        // This will remove all keys that match the user ID
        console.log(`Clearing data for user: ${userId}`);
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.includes(`_user_${userId}`)) {
            localStorage.removeItem(key);
          }
        });
      } else {
        // Clear all data (fallback)
        localStorage.clear();
      }
    } catch (error) {
      console.error('Secure storage clear error:', error);
    }
  },

  // Get all keys for a specific user
  getUserKeys: (userId) => {
    try {
      const keys = Object.keys(localStorage);
      return keys.filter(key => key.includes(`_user_${userId}`));
    } catch (error) {
      console.error('Secure storage getUserKeys error:', error);
      return [];
    }
  },

  // Get all user IDs that have data
  getAllUserIds: () => {
    try {
      const keys = Object.keys(localStorage);
      const userIds = new Set();
      
      keys.forEach(key => {
        const match = key.match(/_user_([^_]+)$/);
        if (match) {
          userIds.add(match[1]);
        }
      });
      
      return Array.from(userIds);
    } catch (error) {
      console.error('Secure storage getAllUserIds error:', error);
      return [];
    }
  },

  // Debug function to show all storage data
  debugStorage: () => {
    try {
      const allKeys = Object.keys(localStorage);
      const userData = {};
      
      allKeys.forEach(key => {
        if (key.includes('myProperties')) {
          const match = key.match(/_user_([^_]+)$/);
          const userId = match ? match[1] : 'shared';
          userData[userId] = key;
        }
      });
      
      console.log('Storage Debug:', {
        allKeys: allKeys.filter(k => k.includes('myProperties')),
        userData,
        totalKeys: allKeys.length
      });
      
      return userData;
    } catch (error) {
      console.error('Debug storage error:', error);
      return {};
    }
  }
}; 