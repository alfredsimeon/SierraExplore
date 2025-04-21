# Google Authentication Setup Guide

This guide will walk you through setting up Google Authentication for your Sierra Explore application.

## Prerequisites

1. A Firebase project (already set up)
2. A Google account with access to Google Cloud Console
3. Your application running locally or deployed

## Step 1: Configure Firebase Authentication

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project "sierraexplore-21919"
3. In the left sidebar, click on "Authentication"
4. Click on the "Sign-in method" tab
5. Find "Google" in the list of providers and click on it
6. Toggle the "Enable" switch to the "on" position
7. Enter your project's support email (this is usually your email)
8. Click "Save"

## Step 2: Configure OAuth Consent Screen

1. In the Firebase Console, click on the "Google Cloud Platform" link in the Authentication section
2. In the Google Cloud Console, navigate to "APIs & Services" > "OAuth consent screen"
3. Select the appropriate user type:
   - "External" if you want to allow any Google user to sign in
   - "Internal" if you only want users in your organization to sign in
4. Fill in the required information:
   - App name: "Sierra Explore"
   - User support email: Your email
   - Developer contact information: Your email
5. Click "Save and Continue"
6. Add the necessary scopes:
   - `./auth/userinfo.email`
   - `./auth/userinfo.profile`
7. Click "Save and Continue"
8. Add test users if needed (for External user type)
9. Click "Save and Continue"

## Step 3: Configure Authorized Domains

1. Return to the Firebase Console
2. Go to "Authentication" > "Settings"
3. Scroll down to the "Authorized domains" section
4. Add your application domains:
   - `localhost` (for local development)
   - Your production domain (if deployed)

## Step 4: Create OAuth Client ID

1. In the Google Cloud Console, navigate to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application" as the application type
4. Name: "Sierra Explore Web Client"
5. Add authorized JavaScript origins:
   - `http://localhost:3000` (for local development)
   - Your production URL (if deployed)
6. Add authorized redirect URIs:
   - `http://localhost:3000` (for local development)
   - Your production URL (if deployed)
7. Click "Create"
8. Note the Client ID and Client Secret (you won't need to add these to your code as Firebase handles this)

## Step 5: Test Google Authentication

1. Run your application locally with `npm run dev`
2. Navigate to the login page
3. Click the "Google" sign-in button
4. Complete the Google authentication flow
5. Verify that you are redirected back to your application and logged in

## Troubleshooting

### Common Issues

1. **Popup Closed by User**: This is normal if the user closes the popup
2. **Unauthorized Domain**: Make sure your domain is added to the Authorized domains list
3. **Popup Blocked**: Check browser settings to allow popups
4. **CORS Issues**: Verify Firebase project settings and domain authorization

### Debugging Tips

1. Check the browser console for error messages
2. Verify that your Firebase configuration in `lib/firebase.ts` matches your Firebase project settings
3. Make sure you've enabled Google as a sign-in provider in Firebase Authentication
4. Check that your application domain is added to the authorized domains list

## Additional Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Firebase Google Auth Guide](https://firebase.google.com/docs/auth/web/google-signin)
