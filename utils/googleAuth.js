const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID, // Client ID from Google Cloud Console
        });

        const payload = ticket.getPayload(); // Extract user details
        return {
            googleId: payload.sub, // Google User ID
            email: payload.email,
            firstName: payload.given_name,
            lastName: payload.family_name,
            picture: payload.picture, // User profile picture (optional)
            emailVerified: payload.email_verified
        };
    } catch (error) {
        console.error('Error verifying Google token:', error);
        return null; // Return null if verification fails
    }
}

module.exports = verifyGoogleToken;
