import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';


Spotify.getAccessToken();
//Spotify.savePlaylist('a',[1,2,3]);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],

      playlistName: 'New Playlist',

      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.search = this.search.bind(this);
  }

addTrack(track)
  {
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

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);

    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    alert(`Successfully saved '${this.state.playlistName}' to Spotify.`);

    this.setState({
      searchResults: [],
      playlistTracks: [],
      playlistName: 'New Playlist'
    });
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  } 

  search(term) {
    Spotify.search(term)
    .then(searchResults => this.setState({
      searchResults: searchResults
    }));
  }
  

  

  render() {
   // if there are no searches, display only search bar   
    console.log(this.state.search);
    if(this.state.searchResults.length === 0 && this.state.search === undefined) {
      return (
          <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
              <div className="App">
                <SearchBar onSearch={this.search}/>
              </div>
          </div>
        );
    }
    // if there is a search, display track and playlist divs
    else {
      return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
              <SearchBar onSearch={this.search}/>

              <div className="App-playlist">
              <SearchResults 
                searchResults={this.state.searchResults}
                onAdd={this.addTrack}
                isRemoval={false} />

             <Playlist 
                playlistName={this.state.playlistName}
                playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                isRemoval={true} 
                onNameChange={this.updatePlaylistName} 
                onSave={this.savePlaylist} 
                updateDefaultName={this.state.playlistName}/>

            </div>
          </div>
      </div>
    );
    }
  }
}

export default App;
