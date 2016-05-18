/*
 * Configuration data for different passport strategies
 */
module.exports = {
    'facebookAuth': {
        clientID:'1712907472319493',
        clientSecret: '3184d77e87a56a5b2ad93761da7d87dd',
        callbackURL: 'http://localhost:5885/user/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'emails']
    }


//'twitterAuth': { clientID: ..., clientSecret: ... }
};
//[1] http://passportjs.org/docs/profile