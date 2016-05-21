// http://passportjs.org/guide/twitter/
var passport = require('passport')
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// Sessionの設定
// http://passportjs.org/guide/configure/
passport.serializeUser(function(user, done) {
    console.log('/////serializeUser//////');
    console.log(user);
    console.log('/////serializeUser//////');
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    console.log('/////deserializeUser//////');
    console.log(obj);
    console.log('/////deserializeUser//////');
    done(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackUrl
  },
  function(token, tokenSecret, profile, done) {
    console.log(token);
    console.log(tokenSecret);
    console.log(profile);
    passport.session.id = profile.id;

    // tokenとtoken_secretをセット
    profile.twitter_token = token;
    profile.twitter_token_secret = tokenSecret;

    process.nextTick(function () {
        return done(null, profile);
    });
  }
));


passport.use(new FacebookStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackUrl
  },
  function(accessToken, refreshToken, profile, done){
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    // 認証後返されるaccessTokenをセッションに持たせておく 本当にアプリを作る場合はこのあたりの扱いは注意
    passport.session.accessToken = accessToken; 

    // 以下今回は単純にFacebookから返されるProfileをそのままユーザ情報としてセッションで保持するようにしておく
    process.nextTick(function(){
    done(null ,profile);
  });
}));

module.exports = { passport: passport };