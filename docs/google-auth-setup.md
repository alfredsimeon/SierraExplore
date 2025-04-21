# Google Authentication Setup Guide

This guide will walk you through setting up Google Authentication for your Sierra Explore application.

## Prerequisites

1. A Firebase project
2. A Google Cloud Platform account (automatically created with Firebase)
3. Access to the Firebase Console

## Step 1: Configure Firebase Authentication

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. In the left sidebar, click on "Authentication"
4. Click on the "Sign-in method" tab
5. Find "Google" in the list of providers and click on it
6. Toggle the "Enable" switch to the "on" position
7. Enter your project's support email
8. Click "Save"

## Step 2: Configure OAuth Consent Screen

1. In the Firebase Console, click on the "Google Cloud Platform" link in the Authentication section
2. In the Google Cloud Console, navigate to "APIs & Services" > "OAuth consent screen"
3. Select the appropriate user type (External or Internal)
4. Fill in the required information:
   - App name
   - User support email
   - Developer contact information
5. Click "Save and Continue"
6. Add any necessary scopes (email and profile are usually sufficient)
7. Click "Save and Continue"
8. Add test users if needed (for External user type)
9. Click "Save and Continue"

## Step 3: Configure Authorized Domains

1. Return to the Firebase Console
2. Go to Authentication > Settings
3. Scroll down to the "Authorized domains" section
4. Add your application domains (e.g., localhost, your production domain)

## Step 4: Test Google Authentication

1. Run your application locally
2. Navigate to the login page
3. Click the "Google" sign-in button
4. Complete the Google authentication flow
5. Verify that you are redirected back to your application and logged in

## Troubleshooting

### Popup Closed by User

If you see "auth/popup-closed-by-user" errors, this is usually because the user closed the Google sign-in popup. This is not an error with your configuration.

### Unauthorized Domain

If you see "auth/unauthorized-domain" errors, make sure your domain is added to the Authorized domains list in Firebase Authentication settings.

### Popup Blocked

If the popup is blocked, make sure your browser allows popups for your application domain. Also, ensure that the sign-in function is triggered by a user action (like a button click).

### CORS Issues

If you see CORS-related errors, check that your Firebase project's authentication settings are correctly configured and that you're using the correct Firebase project.

## Additional Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Google Sign-In Documentation](https://firebase.google.com/docs/auth/web/google-signin)
- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)
\`\`\`

Let's also update the navigation component to ensure it handles authentication state properly:
