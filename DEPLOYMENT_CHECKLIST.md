# Deployment Checklist for EstateX

## Before Deploying to Vercel

### 1. Environment Variables Check
- [ ] Verify all environment variables are set in Vercel dashboard
- [ ] Check that no environment variables are missing
- [ ] Ensure variables are set for all environments (Production, Preview, Development)

### 2. Firebase Configuration
- [ ] Verify Firebase project settings
- [ ] Check authorized domains include your Vercel domain
- [ ] Ensure Firebase Authentication is enabled
- [ ] Verify Google OAuth is configured (if using)

### 3. Vercel Settings
- [ ] Check build settings are correct
- [ ] Verify Node.js version (should be 20.x)
- [ ] Ensure no build cache issues

## Environment Variables Required

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCZpltVDLgquCaLZ2lsgEVOwYmkdNQktR4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=estatex-c39d5.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=estatex-c39d5
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=estatex-c39d5.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=207202007080
NEXT_PUBLIC_FIREBASE_APP_ID=1:207202007080:web:fc6c8b0ae93ad79b99dd1d
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-PBRGS54WD3
NEXT_PUBLIC_ENCRYPTION_KEY=estatex-secure-key-2024
```

## Troubleshooting Steps

### If Authentication Stops Working:
1. Check Vercel dashboard for missing environment variables
2. Verify Firebase authorized domains
3. Clear Vercel build cache
4. Redeploy with fresh environment variables

### If Build Fails:
1. Check Node.js version compatibility
2. Verify all dependencies are installed
3. Check for any syntax errors in code

## Quick Fix Commands

```bash
# Clear Vercel cache and redeploy
vercel --force

# Check environment variables
vercel env ls

# Add missing environment variable
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
```

## Monitoring

- Check Vercel deployment logs for errors
- Monitor Firebase console for authentication issues
- Use browser console to debug client-side issues 