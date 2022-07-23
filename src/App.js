import './App.css';
import React, { useEffect } from "react";
import Login from './Components/Login';
import { getTokkenFromURL } from './Components/Spotify.js'
import SpotifyWebApi from 'spotify-web-api-js';
import Player from "./Components/Player.js"
import { useDataLayerValue } from './Components/DataLayer';

const spotify = new SpotifyWebApi();

function App() {

  const [{ token }, dispatch] = useDataLayerValue();

  // run code based on a given condition
  useEffect(() => {
    const hash = getTokkenFromURL();
    window.location.hash = ""

    const _token = hash.access_token;


    if (_token) {
      // setToken(_token);
      spotify.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token
      })





      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user
        });
      });

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });


      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        })
      })

      spotify.getPlaylist("37i9dQZEVXcQICJoUBVxq2").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );
    }
  }, [token, dispatch]);


  return (<div className="App" > {
    token ? (< Player spotify={
      spotify
    }
    />) : (<Login />)
  } </div>
  );
}

export default App;