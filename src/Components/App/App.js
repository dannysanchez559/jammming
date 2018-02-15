import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [{
          name: 'Daniel',
          artist: 'Bat for Lashes',
          album: 'who knows'
        }],

      playlistName: ['My Playlist'],

      playlistTracks: [{
        name: 'Track One',
        artist: 'Artist One',
        album: 'Album One'
      }]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

addTrack(track)
  {
    console.log(this.state.playlistTracks);
    if(!this.state.playlistTracks.find(t => t.name === track.name))
    {
      let tempList = this.state.playlistTracks.slice();
      tempList.push(track);
      this.setState({ playlistTracks: tempList });
    }
  }

  removeTrack(track) {
    if(this.state.playlistTracks.find(t => track.name)) {
      let tempList = this.state.playlistTracks.slice();
      tempList.pop(track);
      this.setState({playlistTracks: tempList});
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            
           <div className="App-playlist">
             <SearchResults 
                searchResults={this.state.searchResults}
                onAdd={this.addTrack} />

             <Playlist 
                playlistName={this.state.playlistName}
                playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack} />

            </div>
          </div>
      </div>
    );
  }
}

export default App;
