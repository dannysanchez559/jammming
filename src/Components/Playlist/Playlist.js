import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';

class Playlist extends React.Component {
  constructor(props){
  	super(props);

  	this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
  	this.props.onNameChange(event.target.value);

	}

  render() {
  	return (
      <div className="Playlist">
        <input 
           defaultValue={this.props.updateDefaultName} 
           onChange={this.handleNameChange}
           value={this.props.updateDefaultName}
            />
        <TrackList
           tracks={this.props.playlistTracks}
           onRemove={this.props.onRemove} 
           isRemoval={this.props.isRemoval}/>
        
        <a onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
  	);
  }
}

export default Playlist;