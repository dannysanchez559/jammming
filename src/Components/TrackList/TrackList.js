import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component {
	render() {
		return(
	      <div className="TrackList">
			{(this.props.tracks).map(track => 
			// codecademy said to use key={track.id}
			<Track 
			  key={track.name} 
			  track={track}
			  onAdd={this.props.onAdd} 
			  onRemove={this.props.onRemove} />
			  )}
	      </div>
	  );
	}
}

export default TrackList;