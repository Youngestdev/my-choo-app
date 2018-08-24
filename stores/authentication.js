var auth0 = require('auth0-js')

module.exports = store

var auth0Client = new auth0.WebAuth({
  domain: 'budul.auth0.com',
  audience: 'https://budul.auth0.com/userinfo',
  clientID: 'TlUM1tTHNi3SGXqIBuQGz5jVbttCnfxc',
  redirectUri: 'localhost:8080/callback',
  responseType: 'token id_token',
  scope: 'openid profile'
})

function store (state, emitter) {
  state.authenticated = false

  state.events.LOAD_PROFILE = 'loadProfile'
  state.events.SIGN_IN = 'signIn'
  state.events.SIGN_OUT = 'signOut'
  state.events.AUTHENTICATE = 'authenticate'

  emitter.on(state.events.LOAD_PROFILE, function () {
    emitter.on(state.events.DOMCONTENTLOADED, function () {
      auth0Client.parseHash({ hash: window.location.hash }, function (err, authResult) {
        if (err) return console.log(err)

        state.authenticated = true
        state.profile = authResult.idTokenPayload
        emitter.emit(state.events.PUSHSTATE, '/user')
      })
    })
  })

  emitter.on(state.events.SIGN_IN, function () {
    auth0Client.authorize()
  })

  emitter.on(state.events.SIGN_OUT, function () {
    state.authenticated = false
    state.profile = null
    emitter.emit(state.events.PUSHSTATE, '/')
  })

  emitter.on(state.events.AUTHENTICATE, function() {
    if (state.authenticated) {
      emitter.emit('render')
    }
    emitter.emit(state.events.REPLACESTATE, '/')
  })
}
