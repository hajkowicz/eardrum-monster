(this["webpackJsonpeardrum-monster"]=this["webpackJsonpeardrum-monster"]||[]).push([[0],{102:function(e,t,n){e.exports=n.p+"static/media/logo.86828523.png"},127:function(e,t,n){e.exports=n(207)},132:function(e,t,n){},133:function(e,t,n){},207:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(99),i=n.n(o),c=(n(132),n(18)),s=(n(133),n(100)),l=n(101),u=function(){function e(t){Object(s.a)(this,e),this.accessToken=t,this.freshAccessToken=!0,this.player=null}return Object(l.a)(e,[{key:"fetchState",value:function(){return this.player?this.player.getCurrentState():(console.error("Player not initialized"),Promise.reject("player not initialized"))}},{key:"handleNewState",value:function(t){var n=this,a=t.spotifyURI;this.player?this.fetchState().then((function(r){e.getUriFromState(r)!==a?n.play(a):Math.abs(t.position-r.position)>1e4&&n.seek(t.position)})):this.play(a)}},{key:"pause",value:function(){return this.player.pause()}},{key:"seek",value:function(e){return this.player.seek(e)}},{key:"nextTrack",value:function(){return this.player.nextTrack()}},{key:"play",value:function(e){return fetch("https://api.spotify.com/v1/me/player/play?device_id=".concat(this.deviceId),{method:"PUT",body:JSON.stringify({uris:[e]}),headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.accessToken)}}).then((function(e){e.ok||console.error("error playing uri")}))}},{key:"onPlayerStateChanged",value:function(t){var n=this;this.player.addListener("player_state_changed",(function(a){var r=e.getTrackFromState(a),o=e.getUriFromState(a);o===n.currentSongUri&&(r=null),n.currentSongUri=o,t({newState:a,newSong:r})}))}},{key:"prepareSpotifyClient",value:function(){var e=this;return new Promise((function(t){if(e.player)t();else{window.onSpotifyWebPlaybackSDKReady=function(){e.initializePlayer().then(t)};var n=document.createElement("script");n.src="https://sdk.scdn.co/spotify-player.js",document.body.appendChild(n)}}))}},{key:"initializePlayer",value:function(){var e=this;return new Promise((function(t){e.player=new window.Spotify.Player({name:"eardrum.monster",getOAuthToken:e.fetchOauthToken.bind(e),volume:.1}),e.player.on("initialization_error",(function(e){var t=e.message;console.error("Failed to initialize",t)})),e.player.on("authentication_error",(function(e){var t=e.message;console.error("Failed to authenticate",t)})),e.player.on("account_error",(function(e){var t=e.message;console.error("Failed to validate Spotify account",t)})),e.player.on("playback_error",(function(e){var t=e.message;console.error("Failed to perform playback",t)})),e.player.on("ready",(function(n){var a=n.device_id;e.deviceId=a,fetch("https://api.spotify.com/v1/me/player",{method:"PUT",body:JSON.stringify({device_ids:[e.deviceId],play:!0}),headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e.accessToken)}}).then((function(e){e.ok?t():console.error("unable to transfer playback to web player")}))})),e.player.connect().then((function(e){e||console.error("Failed to connect to the web player")}))}))}},{key:"fetchOauthToken",value:function(e){this.freshAccessToken||console.error("fetchOauthToken called more than once"),e(this.accessToken)}},{key:"fetchCurrentDeviceId",value:function(){return fetch("https://api.spotify.com/v1/me/player",{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.accessToken)}}).then((function(e){return e.ok||console.error("error fetching device id"),e.body.device&&e.body.device.id?(console.log("fetched device ID"),e.body.device.id):null}))}},{key:"fetchUserInfo",value:function(){return fetch("https://api.spotify.com/v1/me",{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.accessToken)}}).then((function(e){if(!e.ok)throw e;return e.json()}))}},{key:"setDeviceId",value:function(e){this.deviceId=e}}],[{key:"getTrackFromState",value:function(e){return e&&e.track_window&&e.track_window.current_track?e.track_window.current_track:null}},{key:"getUriFromState",value:function(e){return e&&e.track_window&&e.track_window.current_track?e.track_window.current_track.uri:null}},{key:"isAd",value:function(e){return!!(e&&e.track_window&&e.track_window.current_track)&&"ad"===e.track_window.current_track.type}}]),e}(),p=n(102),f=n.n(p),m=n(14);var d=function(e){var t=e.accessToken,n=e.clearAccessToken,a=e.username,o=encodeURIComponent("https://eardrum.monster/"),i="https://accounts.spotify.com/authorize?response_type=token&client_id=".concat("d73f9dfa97c44b57ac7cefcc031c4df9","&scope=").concat("streaming+user-read-email+user-read-private+user-read-playback-state+user-modify-playback-state+user-read-currently-playing","&redirect_uri=").concat(o);return r.a.createElement("header",{className:"App-header"},r.a.createElement(m.b,{className:"App-title",to:"/"},r.a.createElement("h1",null,"EARDRUM MONSTER")),r.a.createElement("img",{src:f.a,className:"App-logo",alt:"logo"}),null!=t?r.a.createElement(r.a.Fragment,null,r.a.createElement(m.b,{className:"App-link",to:"/u/".concat(a)},"/u/",a),r.a.createElement("a",{className:"App-link",href:"#",onClick:function(e){e.preventDefault(),n()}},"Logout")):r.a.createElement("a",{className:"App-link",href:i},"Login with Spotify"))};var h=function(e){var t=e.setAccessToken;return r.a.useEffect((function(){if(window.location.hash){var e={};window.location.hash.slice(1).split("&").map((function(e){return e.split("=")})).forEach((function(t){e[t[0]]=t[1]}));var n=e.access_token;window.location.hash="",t(n)}})),null},y=n(23),v=n(16),k=n(208),g=n(229),E="\n  mutation CreateSongEvent(\n    $input: CreateSongEventInput!\n    $condition: ModelSongEventConditionInput\n  ) {\n    createSongEvent(input: $input, condition: $condition) {\n      id\n      spotifyURI\n      timestamp\n      position\n      userID\n      user {\n        userID\n        songEvents {\n          nextToken\n        }\n      }\n    }\n  }\n",w=function(e){var t=e.songs;return r.a.createElement("div",null,r.a.createElement("h3",null,"Recently played"),r.a.createElement("ul",null,t.map((function(e){return r.a.createElement("li",{key:e.id},e.spotifyURI)}))))};function S(e){var t=e.song,n=e.spotify,a=r.a.useState(null),o=Object(c.a)(a,2),i=o[0],s=o[1];return r.a.useEffect((function(){n&&n.fetchCurrentDeviceId().then((function(e){return e?n.setDeviceId(e):n.prepareSpotifyClient()})).then((function(){return s(n.deviceId)}))}),[n]),r.a.useEffect((function(){n&&t&&i&&n.handleNewState(t)}),[t,i,n]),null}function b(e){var t=e.hostUsername;return r.a.useEffect((function(){var e=setInterval((function(){var e={userID:t,timestamp:Math.floor(Date.now()/100),position:0,spotifyURI:["spotify:track:08KMh61hPslT7sEf2tEgtT","spotify:track:4mFDsq9pt9msJ9ywYvBzHo","spotify:track:59nNxS2V7M4UDH058BU5qJ","spotify:track:1CkrhTdtRhUzPmA8qtr6y6","spotify:track:4mFDsq9pt9msJ9ywYvBzHo","spotify:track:6AynxUt8LJy9S6bovDdFLr","spotify:track:000PzErbB04ALQCv9iYiQm","spotify:track:6AynxUt8LJy9S6bovDdFLr","spotify:track:7JGepQzDnQDYeGxLCTBSsG","spotify:track:4PPrsYpzuRqe4QoCDGAG4b"][(100*Math.random()).toString()[0]]};v.a.graphql(Object(k.b)(E,{input:e})).then((function(e){return console.log(e)}))}),5e3);return function(){clearInterval(e)}}),[t]),r.a.createElement("h1",null,"DevPublisher enabled")}var I=function(e){var t=e.username,n=e.hostUsername,a=e.spotify,o=window.location.search.includes("DEV=1");return r.a.createElement(r.a.Fragment,null,null!=t?r.a.createElement("div",null,"Listening to ",n,"'s channel!"):r.a.createElement("div",null,"Login to spotify to set the eardrum monster free"),o&&r.a.createElement(b,{hostUsername:n}),r.a.createElement(g.a,{query:Object(k.b)("\n  query ListSongEvents(\n    $filter: ModelSongEventFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listSongEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        spotifyURI\n        timestamp\n        position\n        userID\n        user {\n          userID\n        }\n      }\n      nextToken\n    }\n  }\n",{filter:{userID:{eq:n}}}),subscription:Object(k.b)("\n  subscription OnCreateSongEvent($userID: String!) {\n    onCreateSongEvent(userID: $userID) {\n      id\n      spotifyURI\n      timestamp\n      position\n      userID\n      user {\n        userID\n        songEvents {\n          nextToken\n        }\n      }\n    }\n  }\n",{userID:n}),onSubscriptionMsg:function(e,t){var n=t.onCreateSongEvent;return e.listSongEvents.items.unshift(n),e.listSongEvents.items.length>50&&e.listSongEvents.items.pop(),e}},(function(e){var t,n=e.data,o=e.loading;if(e.error)return r.a.createElement("h3",null,"Error");if(o||!n)return r.a.createElement("h3",null,"Loading...");var i=null!==(t=n.listSongEvents&&n.listSongEvents.items)&&void 0!==t?t:[];return r.a.createElement(r.a.Fragment,null,r.a.createElement(S,{song:i[0],spotify:a}),r.a.createElement(w,{songs:i}))})))},T=n(118),_=n.n(T);var D=function(e){var t=e.username,n=e.spotify,a=r.a.useState(!1),o=Object(c.a)(a,2),i=o[0],s=o[1],l=r.a.useState(1),p=Object(c.a)(l,2),f=p[0],m=p[1],d=r.a.useState(null),h=Object(c.a)(d,2),y=h[0],g=h[1],w=r.a.useRef(i),S=r.a.useRef(f);return w.current=i,S.current=f,r.a.useEffect((function(){t&&v.a.graphql(Object(k.b)("\n  mutation CreateUser(\n    $input: CreateUserInput!\n    $condition: ModelUserConditionInput\n  ) {\n    createUser(input: $input, condition: $condition) {\n      userID\n      songEvents {\n        items {\n          id\n          spotifyURI\n          timestamp\n          position\n          userID\n        }\n        nextToken\n      }\n    }\n  }\n",{input:{userID:t}})).catch((function(){return console.error("user creation failed")}))}),[t]),r.a.useEffect((function(){n&&t&&n.prepareSpotifyClient().then((function(){n.fetchState().then((function(e){return g(u.getUriFromState(e))})),n.onPlayerStateChanged((function(e){if(null!=e.newSong){var n,a={userID:t,timestamp:Math.floor(Date.now()/100),position:null!==(n=e.newState.position)&&void 0!==n?n:0,spotifyURI:e.newSong.uri};v.a.graphql(Object(k.b)(E,{input:a})),g(e.newSong.uri)}}))}))}),[n,t]),r.a.useEffect((function(){if(i&&n){n.nextTrack();var e=setInterval((function(){w.current?(m(S.current+1),n.nextTrack()):(clearInterval(e),m(1))}),6e4)}}),[i,w,n]),null==t?r.a.createElement("div",null,"Login to spotify to set the eardrum monster free"):null==n?r.a.createElement("div",null,"Initializing spotify web player..."):r.a.createElement(r.a.Fragment,null,r.a.createElement("label",null,r.a.createElement("span",null,"Power hour mode enabled"),r.a.createElement(_.a,{onChange:s,checked:i})),i&&r.a.createElement("h1",null,f),r.a.createElement("div",null,"broadcasting: ",y))};var U=function(e){var t=e.username,n=e.spotify,a=Object(y.f)().id;return t===a?r.a.createElement(D,{username:t,spotify:n}):r.a.createElement(I,{username:t,hostUsername:a,spotify:n})};var A=function(e){var t=e.username;return r.a.createElement("div",null,r.a.createElement("h2",null,"Currently broadcasting:"),r.a.createElement("ul",null,null!=t?r.a.createElement("li",null,r.a.createElement(m.b,{className:"App-link",to:"/u/".concat(t)},"/u/",t)):null,r.a.createElement("li",null,r.a.createElement(m.b,{to:"/u/alta"},"/u/alta")),r.a.createElement("li",null,r.a.createElement(m.b,{to:"/u/hajkowicz"},"/u/hajkowicz")),r.a.createElement("li",null,r.a.createElement(m.b,{to:"/u/cilo"},"/u/cilo"))))},C={aws_project_region:"us-east-1",aws_appsync_graphqlEndpoint:"https://kponrlcw6jap7j62gb56h2abf4.appsync-api.us-east-1.amazonaws.com/graphql",aws_appsync_region:"us-east-1",aws_appsync_authenticationType:"API_KEY",aws_appsync_apiKey:"da2-jxgfvq7zzvacfozrt7vucdiipq"};n(42).default.configure(C);var j=function(){var e=window.localStorage.getItem("spotifyAccessToken"),t=window.localStorage.getItem("spotifyUsername"),n=r.a.useState(e),a=Object(c.a)(n,2),o=a[0],i=a[1],s=r.a.useState(t),l=Object(c.a)(s,2),p=l[0],f=l[1],v=r.a.useState(null),k=Object(c.a)(v,2),g=k[0],E=k[1];function w(){console.log("clearing"),window.localStorage.removeItem("spotifyAccessToken"),window.localStorage.removeItem("spotifyUsername"),i(null),f(null)}return r.a.useEffect((function(){if(o){var e=new u(o);console.log(e),E(e),e.fetchUserInfo().then((function(e){!function(e){window.localStorage.setItem("spotifyUsername",e),f(e)}(e.id)})).catch((function(){w()}))}}),[o]),r.a.createElement("div",{className:"App"},r.a.createElement(m.a,null,r.a.createElement(h,{setAccessToken:function(e){window.localStorage.setItem("spotifyAccessToken",e),i(e)}}),r.a.createElement(d,{clearAccessToken:w,accessToken:o,username:p}),r.a.createElement(y.c,null,r.a.createElement(y.a,{exact:!0,path:"/"},r.a.createElement(A,{username:p})),r.a.createElement(y.a,{path:"/u/:id"},r.a.createElement(U,{username:p,spotify:g})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[127,1,2]]]);
//# sourceMappingURL=main.b9b06e30.chunk.js.map