// Encryption utility for localStorage
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'estatex-secure-key-2024';

// Simple encryption function (for demo purposes)
// In production, use a more robust encryption library like crypto-js
export const encryptData = (data) => {
  try {
    const jsonString = JSON.stringify(data);
    // Simple base64 encoding with a custom key
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
    
    // Check if data is base64 encoded (encrypted)
    const isBase64 = /^[A-Za-z0-9+/]*={0,2}$/.test(encryptedData);
    
    if (isBase64) {
      try {
        // Try to decrypt as base64
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

// Secure localStorage wrapper
export const secureStorage = {
  setItem: (key, value) => {
    try {
      const encrypted = encryptData(value);
      if (encrypted) {
        localStorage.setItem(key, encrypted);
      }
    } catch (error) {
      console.error('Secure storage set error:', error);
    }
  },

  getItem: (key) => {
    try {
      // Migrate existing data if needed
      migrateExistingData(key);
      
      const encrypted = localStorage.getItem(key);
      const result = encrypted ? decryptData(encrypted) : null;
      return result;
    } catch (error) {
      console.error('Secure storage get error:', error);
      return null;
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Secure storage remove error:', error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Secure storage clear error:', error);
    }
  }
}; 