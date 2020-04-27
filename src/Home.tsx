import React from "react";
import "./Home.css";
import ChannelList from "./ChannelList";

function Home() {
  /* eslint-disable jsx-a11y/accessible-emoji */
  return (
    <div className="Home">
      <div>
        <em>
          eardrum.monster allows you to sync your spotify client with friends
        </em>
      </div>
      <div className="Home-list">
        <ChannelList />
      </div>
      <div className="Home-content">
        <h1>How do I use it?</h1>
        <div>1. Join a channel or create your own ☝️</div>
        <div>2. Share the URL with your friends️</div>
        <h1>Its great for:</h1>
        <div>
          ✅ Streamers who want to let their viewers sync up their music with
          high quality spotify audio
        </div>
        <div>✅ Online gamers who want listen together while gaming</div>
        <div>
          ✅ People who are quarantined and want to have virtual power hours
          together
        </div>

        <h1>Did you say power hour?</h1>
        <div>
          ✅ Yes! eardrum.monster now features <em>Power hour mode™️</em> that
          will automatically change the song every 60s. Everybody must drink
          when the song changes.
        </div>

        <h1>Can I play century club?</h1>
        <div>
          ✅ We've got you covered! <em>Power hour mode™️</em> will keep em'
          coming well beyond the traditional 60 minutes so you can attempt to
          join the century club as many times as you want!
        </div>
      </div>
    </div>
  );
}

export default Home;
