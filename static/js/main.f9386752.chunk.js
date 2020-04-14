(this["webpackJsonpeardrum-monster"]=this["webpackJsonpeardrum-monster"]||[]).push([[0],{134:function(e,n,t){e.exports=t(234)},139:function(e,n,t){},140:function(e,n,t){},229:function(e,n,t){},230:function(e,n,t){},231:function(e,n,t){},233:function(e,n,t){},234:function(e,n,t){"use strict";t.r(n);var a=t(1),r=t.n(a),o=t(107),i=t.n(o),c=(t(139),t(140),t(46)),s=t.n(c),l=t(24),u=t(19),m=t(9),d=t(39),f=t(47),p=t(48),v=function(){function e(n,t){if(Object(f.a)(this,e),null==n)throw new Error("Access token was null");this.accessToken=n,this.onUnauthorized=null!==t&&void 0!==t?t:function(){},this.maybeHandle401=this.maybeHandle401.bind(this)}return Object(p.a)(e,[{key:"maybeHandle401",value:function(e){if(401===e.status)throw this.onUnauthorized(),new Error("Unauthorized: ",e);return e}},{key:"fetchUserInfo",value:function(){return fetch("https://api.spotify.com/v1/me",{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.accessToken)}}).then(this.maybeHandle401).then((function(e){if(!e.ok)throw e;return e.json()}))}},{key:"fetchCurrentDeviceId",value:function(){return fetch("https://api.spotify.com/v1/me/player",{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.accessToken)}}).then(this.maybeHandle401).then((function(e){return e.ok||console.error("error fetching device id"),204===e.status?null:e.json()})).then((function(e){var n;return(null===e||void 0===e||null===(n=e.device)||void 0===n?void 0:n.id)?e.device.id:null}))}},{key:"play",value:function(e,n){var t=null!=n?"?device_id=".concat(n):"";return fetch("https://api.spotify.com/v1/me/player/play/".concat(t),{method:"PUT",body:JSON.stringify({uris:[e]}),headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.accessToken)}}).then(this.maybeHandle401).then((function(e){e.ok||console.error("Error playing uri",e)}))}},{key:"transferPlayback",value:function(e){return fetch("https://api.spotify.com/v1/me/player",{method:"PUT",body:JSON.stringify({device_ids:[e],play:!0}),headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.accessToken)}}).then(this.maybeHandle401).then((function(n){if(!n.ok)throw new Error("unable to transfer playback to device: "+e)}))}},{key:"fetchDevices",value:function(){return fetch("https://api.spotify.com/v1/me/player/devices",{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.accessToken)}}).then(this.maybeHandle401).then((function(e){if(!e.ok)throw new Error("unable to fetch devices");return e.json()}))}}]),e}(),h=t(16),y=t(235),E="\n  mutation CreateSongEvent(\n    $input: CreateSongEventInput!\n    $condition: ModelSongEventConditionInput\n  ) {\n    createSongEvent(input: $input, condition: $condition) {\n      id\n      spotifyURI\n      timestamp\n      position\n      track {\n        uri\n        trackID\n        name\n        durationMs\n        albumName\n        artistName\n        albumImg\n      }\n      userID\n      user {\n        userID\n        latestEvent\n        songEvents {\n          nextToken\n        }\n      }\n    }\n  }\n",k=Object(a.createContext)();function g(e){var n=e.children,t=Object(d.useLocalStorage)("EMAuthInfo"),a=Object(m.a)(t,2),o=a[0],i=a[1],c=Object(l.f)();r.a.useEffect((function(){!function(e,n){if(window.location.hash){var t={};window.location.hash.slice(1).split("&").map((function(e){return e.split("=")})).forEach((function(e){t[e[0]]=e[1]}));var a=t.access_token;window.location.hash="",new v(a).fetchUserInfo().then((function(r){e({accessToken:a,username:r.id}),n.push(decodeURIComponent(t.state))}))}}(i,c)}),[i,c]),r.a.useEffect((function(){o&&h.a.graphql(Object(y.b)("\n  mutation CreateUser(\n    $input: CreateUserInput!\n    $condition: ModelUserConditionInput\n  ) {\n    createUser(input: $input, condition: $condition) {\n      userID\n      latestEvent\n      songEvents {\n        items {\n          id\n          spotifyURI\n          timestamp\n          position\n          userID\n        }\n        nextToken\n      }\n    }\n  }\n",{input:{userID:o.username}})).catch((function(){return console.error("user creation failed")}))}),[o]);var s=r.a.useMemo((function(){return null!=o?{accessToken:o.accessToken,username:o.username,logout:function(){return i(null)}}:null}),[o,i]);return r.a.createElement(k.Provider,{value:s},n)}var b=function(){var e=r.a.useContext(k),n=Object(l.g)(),t=encodeURIComponent("https://eardrum.monster/"),a=encodeURIComponent(n.pathname),o="https://accounts.spotify.com/authorize?response_type=token&client_id=".concat("d73f9dfa97c44b57ac7cefcc031c4df9","&scope=").concat("streaming+user-read-email+user-read-private+user-read-playback-state+user-modify-playback-state+user-read-currently-playing","&redirect_uri=").concat(t,"&state=").concat(a);return r.a.createElement("header",{className:"App-header"},r.a.createElement(u.b,{className:"App-title",to:"/"},r.a.createElement("h1",null,"EARDRUM MONSTER")),r.a.createElement("img",{src:s.a,className:"App-logo",alt:"logo"}),null!=e?r.a.createElement(r.a.Fragment,null,r.a.createElement(u.b,{className:"App-link",to:"/u/".concat(e.username)},"/u/",e.username),r.a.createElement("a",{className:"App-link",href:"#",onClick:function(n){n.preventDefault(),e.logout()}},"Logout")):r.a.createElement("a",{className:"App-link",href:o},"Login with Spotify"))},I=t(255);t(229);function D(e){var n=e.hostUsername;return r.a.useEffect((function(){var e=setInterval((function(){var e={userID:n,timestamp:Math.floor(Date.now()/100),position:0,spotifyURI:["spotify:track:08KMh61hPslT7sEf2tEgtT","spotify:track:4mFDsq9pt9msJ9ywYvBzHo","spotify:track:59nNxS2V7M4UDH058BU5qJ","spotify:track:1CkrhTdtRhUzPmA8qtr6y6","spotify:track:4mFDsq9pt9msJ9ywYvBzHo","spotify:track:6AynxUt8LJy9S6bovDdFLr","spotify:track:000PzErbB04ALQCv9iYiQm","spotify:track:6AynxUt8LJy9S6bovDdFLr","spotify:track:7JGepQzDnQDYeGxLCTBSsG","spotify:track:4PPrsYpzuRqe4QoCDGAG4b"][(100*Math.random()).toString()[0]]};h.a.graphql(Object(y.b)(E,{input:e})).then((function(e){return console.log("Publishing: ",e)}))}),5e3);return function(){clearInterval(e)}}),[n]),r.a.createElement("h1",null,"DevPublisher enabled")}var w=function(){function e(n,t){Object(f.a)(this,e),this.player=n,this.spotifyAPI=t}return Object(p.a)(e,[{key:"fetchState",value:function(){return this.player.getCurrentState()}},{key:"pause",value:function(){return this.player.pause()}},{key:"seek",value:function(e){return this.player.seek(e)}},{key:"nextTrack",value:function(){return this.player.nextTrack()}},{key:"onPlayerStateChanged",value:function(e){this.player.addListener("player_state_changed",e)}},{key:"getDeviceID",value:function(){return this.player.deviceID}},{key:"transferPlayback",value:function(){return this.spotifyAPI.transferPlayback(this.player.deviceID)}}],[{key:"inject",value:function(){return new Promise((function(e){var n,t;if(null===(n=window)||void 0===n||null===(t=n.Spotify)||void 0===t?void 0:t.Player)e();else{window.onSpotifyWebPlaybackSDKReady=function(){e()};var a=document.createElement("script");a.src="https://sdk.scdn.co/spotify-player.js",document.body.appendChild(a)}}))}},{key:"initializePlayer",value:function(n,t){return e.__accessToken=n,e.__onUnauthorized=t,new Promise((function(n){if(window.EMglobalPlayerInstance)n(window.EMGlobalPlayerInstance);else{var t=new window.Spotify.Player({name:"eardrum.monster",getOAuthToken:function(n){return n(e.__accessToken)},volume:.1});t.on("initialization_error",(function(e){var n=e.message;console.error("Failed to initialize",n)})),t.on("authentication_error",(function(n){var t=n.message;console.error("Failed to authenticate",t),e.__onUnauthorized()})),t.on("account_error",(function(e){var n=e.message;console.error("Failed to validate Spotify account",n)})),t.on("playback_error",(function(e){var n=e.message;console.error("Failed to perform playback",n)})),t.on("ready",(function(e){var a=e.device_id;t.deviceID=a,window.EMGlobalPlayerInstance=t,n(t)})),t.connect().then((function(e){e||console.error("Failed to connect to the web player")}))}}))}},{key:"createInstance",value:function(n,t,a){return e.inject().then((function(){return e.initializePlayer(n,a)})).then((function(n){return new e(n,t)}))}},{key:"getTrackFromState",value:function(e){var n;return null===e||void 0===e||null===(n=e.track_window)||void 0===n?void 0:n.current_track}},{key:"isAd",value:function(e){var n,t;return"ad"===(null===e||void 0===e||null===(n=e.track_window)||void 0===n||null===(t=n.current_track)||void 0===t?void 0:t.type)}}]),e}(),T=Object(a.createContext)();function S(e){var n=e.children,t=r.a.useContext(k),a=r.a.useState(null),o=Object(m.a)(a,2),i=o[0],c=o[1],s=r.a.useState(null),l=Object(m.a)(s,2),u=l[0],d=l[1];r.a.useEffect((function(){if(null==t)c(null),d(null);else{var e=new v(t.accessToken,t.logout);d(e),w.createInstance(t.accessToken,e,t.logout).then((function(e){c(e)}))}}),[t]);var f=r.a.useMemo((function(){return{webPlayer:i,spotifyAPI:u}}),[i,u]);return r.a.createElement(T.Provider,{value:f},n)}function U(){var e=r.a.useContext(T);return null===e||void 0===e?void 0:e.webPlayer}function C(e){var n=e.song,t=function(){var e=r.a.useContext(T);return null===e||void 0===e?void 0:e.spotifyAPI}(),a=U(),o=r.a.useState(null),i=Object(m.a)(o,2),c=i[0],s=i[1],l=r.a.useState(null),u=Object(m.a)(l,2),d=u[0],f=u[1],p=a&&{id:a.getDeviceID(),name:"eardrum.monster"},v=null!==d&&void 0!==d?d:[];null==p||v.find((function(e){return e.id===p.id}))||v.push(p),r.a.useEffect((function(){t&&t.fetchDevices().then((function(e){f(e.devices)}))}),[t]),r.a.useEffect((function(){if(t&&d){var e=d.find((function(e){return!0===e.is_active}));if(e)return void s(e.id);a&&s(a.getDeviceID())}}),[t,d,a]),r.a.useEffect((function(){c&&t&&t.play(n.spotifyURI,c)}),[t,c,n]);return r.a.createElement("select",{value:null!==c&&void 0!==c?c:"",onChange:function(e){s(e.target.value)}},null===v||void 0===v?void 0:v.map((function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.name)})))}t(230);var j=function(e){var n,t,a=e.track;return r.a.createElement("div",{className:"Track"},r.a.createElement("img",{className:"Track-albumImg",src:null!==(n=null===a||void 0===a?void 0:a.albumImg)&&void 0!==n?n:s.a,alt:"Album art"}),r.a.createElement("div",{className:"Track-details"},r.a.createElement("p",{className:"Track-name"},null!==(t=null===a||void 0===a?void 0:a.name)&&void 0!==t?t:"Unknown"),r.a.createElement("p",{className:"Track-artist"},null===a||void 0===a?void 0:a.artistName)))};function N(e){var n=e.songs;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h3",null,"Recently played tracks"),n.map((function(e){return r.a.createElement("div",{key:e.id,className:"Listen-track"},r.a.createElement(j,{track:e.track}))})))}var P="\n  query SongEventsByUserId(\n    $userID: String\n    $timestamp: ModelIntKeyConditionInput\n    $sortDirection: ModelSortDirection\n    $filter: ModelSongEventFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    songEventsByUserID(\n      userID: $userID\n      timestamp: $timestamp\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      items {\n        id\n        spotifyURI\n        timestamp\n        position\n        track {\n          uri\n          trackID\n          name\n          durationMs\n          albumName\n          artistName\n          albumImg\n        }\n        userID\n        user {\n          userID\n          latestEvent\n        }\n      }\n      nextToken\n    }\n  }\n";var O=function(e){var n=e.hostUsername,t=r.a.useContext(k),a=window.location.search.includes("DEV=1");return r.a.createElement("div",{className:"Listen"},r.a.createElement("div",{className:"Listen-header"},null!=t?r.a.createElement("div",null,"Listening to ",n,"'s channel!"):r.a.createElement("div",null,"Login to spotify to set the eardrum monster free"),a&&r.a.createElement(D,{hostUsername:n})),r.a.createElement("div",{className:"Listen-trackList"},r.a.createElement(I.a,{query:Object(y.b)(P,{userID:n,sortDirection:"DESC",limit:50}),subscription:Object(y.b)("\n  subscription OnCreateSongEvent($userID: String!) {\n    onCreateSongEvent(userID: $userID) {\n      id\n      spotifyURI\n      timestamp\n      position\n      track {\n        uri\n        trackID\n        name\n        durationMs\n        albumName\n        artistName\n        albumImg\n      }\n      userID\n      user {\n        userID\n        latestEvent\n        songEvents {\n          nextToken\n        }\n      }\n    }\n  }\n",{userID:n}),onSubscriptionMsg:function(e,n){var t=n.onCreateSongEvent;return e.songEventsByUserID.items.unshift(t),e.songEventsByUserID.items.length>50&&e.songEventsByUserID.items.pop(),e}},(function(e){var n,a=e.data,o=e.loading;if(e.error)return r.a.createElement("h3",null,"Error");if(o||!a)return r.a.createElement("h3",null,"Loading...");var i=null!==(n=a.songEventsByUserID&&a.songEventsByUserID.items)&&void 0!==n?n:[];return 0===i.length?r.a.createElement("div",null,"No track history available"):r.a.createElement(r.a.Fragment,null,null!=t&&r.a.createElement(C,{song:i[0]}),r.a.createElement(N,{songs:i}))}))))},_=t(124);t(231);function $(e){var n=e.currentTrack,t=e.onSongEvent,a=r.a.useContext(k),o=U(),i=r.a.useRef(null);return i.current=function(e){var r,o=w.getTrackFromState(e);if(null!=o&&o.uri!==n.uri){var i,c={userID:a.username,timestamp:Math.floor(Date.now()/100),position:Math.floor(null!==(r=e.position)&&void 0!==r?r:0),spotifyURI:o.uri},s={uri:o.uri,trackID:o.id,name:o.name,durationMs:o.duration_ms,albumName:o.album.name,artistName:o.artists[0].name,albumImg:o.album.images[0].url};t(s,c),(i=s,h.a.graphql(Object(y.b)("\n  mutation CreateTrack(\n    $input: CreateTrackInput!\n    $condition: ModelTrackConditionInput\n  ) {\n    createTrack(input: $input, condition: $condition) {\n      uri\n      trackID\n      name\n      durationMs\n      albumName\n      artistName\n      albumImg\n    }\n  }\n",{input:i}))).then((function(){return function(e){return h.a.graphql(Object(y.b)(E,{input:e}))}(c)}))}},r.a.useEffect((function(){o&&(o.fetchState().then((function(e){return i.current(e)})),o.onPlayerStateChanged((function(e){return i.current(e)})),o.transferPlayback())}),[o,i]),null}var x=t(123),M=t.n(x);function A(){var e=Object(d.useLocalStorage)("EMPhEnabled",!1),n=Object(m.a)(e,2),t=n[0],a=n[1],o=Object(d.useLocalStorage)("EMPhCount",1),i=Object(m.a)(o,2),c=i[0],s=i[1],l=U(),u=r.a.useRef();return u.current=function(e){t&&l?(s((function(e){return e+1})),l.nextTrack()):(clearInterval(e),s(1))},r.a.useEffect((function(){if(t&&l){l.nextTrack();var e=setInterval((function(){u.current(e)}),6e4);return function(){clearInterval(e)}}}),[t,l,u]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"Broadcast-controls"},r.a.createElement("label",{htmlFor:"phToggle"},"Power hour mode"),r.a.createElement(M.a,{className:"Broadcast-switch",id:"phToggle",onChange:a,checked:t})),t&&r.a.createElement("h1",null,c))}var z=function(){var e=r.a.useContext(k),n=r.a.useState(null),t=Object(m.a)(n,2),a=t[0],o=t[1],i=r.a.useState(null),c=Object(m.a)(i,2),s=c[0],l=c[1],u=U(),d=r.a.useCallback((function(e,n){o((function(t){return[Object(_.a)({},n,{track:e,id:Math.random()})].concat(t)})),l(e)}),[o,l]);return r.a.useEffect((function(){e&&h.a.graphql(Object(y.b)(P,{userID:e.username,sortDirection:"DESC",limit:10})).then((function(e){var n,t,a;o(null!==(n=null===(t=e.data)||void 0===t||null===(a=t.songEventsByUserID)||void 0===a?void 0:a.items)&&void 0!==n?n:[])}))}),[e]),null==e?r.a.createElement("div",null,"Login to spotify to set the eardrum monster free"):null==u||null==a?r.a.createElement("div",{className:"Broadcast"},"Initializing..."):r.a.createElement("div",{className:"Broadcast"},r.a.createElement(A,{spotifyWebPlayer:u}),r.a.createElement("h1",null,"Connected."),r.a.createElement("p",null,"Now Playing:"),r.a.createElement("div",{className:"Broadcast-currentTrack"},r.a.createElement($,{currentTrack:null!==s&&void 0!==s?s:a[0].track,onSongEvent:d}),r.a.createElement(j,{track:null!==s&&void 0!==s?s:a[0].track})),r.a.createElement("div",{className:"Broadcast-history"},r.a.createElement(N,{songs:a.slice(1)})))};var B=function(){var e=r.a.useContext(k),n=Object(l.h)().id;return(null===e||void 0===e?void 0:e.username)===n?r.a.createElement(z,null):r.a.createElement(O,{hostUsername:n})},L=(t(233),function(e){var n=e.users;return r.a.createElement("ul",{className:"Home-userList"},n.map((function(e){return r.a.createElement("li",{key:e.userID},r.a.createElement(u.b,{className:"Home-link",to:"/u/".concat(e.userID)},"\ud83d\udc42 /u/",e.userID))})))});var R=function(){return r.a.createElement("div",{className:"Home"},r.a.createElement(I.a,{query:Object(y.b)("\n  query ListUsers(\n    $userID: String\n    $filter: ModelUserFilterInput\n    $limit: Int\n    $nextToken: String\n    $sortDirection: ModelSortDirection\n  ) {\n    listUsers(\n      userID: $userID\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      sortDirection: $sortDirection\n    ) {\n      items {\n        userID\n        latestEvent\n        songEvents {\n          nextToken\n        }\n      }\n      nextToken\n    }\n  }\n",{limit:20}),subscription:Object(y.b)("\n  subscription OnUpdateUser {\n    onUpdateUser {\n      userID\n      latestEvent\n      songEvents {\n        items {\n          id\n          spotifyURI\n          timestamp\n          position\n          userID\n        }\n        nextToken\n      }\n    }\n  }\n"),onSubscriptionMsg:function(e,n){n.onUserUpdate;return e}},(function(e){var n,t=e.data,a=e.loading;if(e.error)return r.a.createElement("h3",null,"Error");if(a||!t)return r.a.createElement("h3",null,"Loading...");var o=null!==(n=t.listUsers&&t.listUsers.items)&&void 0!==n?n:[];return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"\ud83d\ude08 MONSTER LIST \ud83d\ude08"),r.a.createElement(L,{users:o}))})))};var F=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(u.a,null,r.a.createElement(g,null,r.a.createElement(S,null,r.a.createElement(b,null),r.a.createElement("div",{className:"App-content"},r.a.createElement(l.c,null,r.a.createElement(l.a,{exact:!0,path:"/"},r.a.createElement(R,null)),r.a.createElement(l.a,{path:"/u/:id"},r.a.createElement(B,null))))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var q={aws_project_region:"us-east-1",aws_appsync_graphqlEndpoint:"https://kponrlcw6jap7j62gb56h2abf4.appsync-api.us-east-1.amazonaws.com/graphql",aws_appsync_region:"us-east-1",aws_appsync_authenticationType:"API_KEY",aws_appsync_apiKey:"da2-jxgfvq7zzvacfozrt7vucdiipq"};t(21).default.configure(q),i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},46:function(e,n,t){e.exports=t.p+"static/media/logo.86828523.png"}},[[134,1,2]]]);
//# sourceMappingURL=main.f9386752.chunk.js.map