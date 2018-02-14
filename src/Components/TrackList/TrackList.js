import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component {
	render() {
		return(
	      <div className="TrackList">
	        {/*you will add a map method that renders a set of Track 
	          components */}

			   {(this.props.tracks).map((track, index) => {
			   	  console.log(track);
			   		return (
			   			// codecademy said to use key={track.id}
			   			  <Track 
			   			  	key={track.name} 
			   			    track={track}
			   			    onAdd={this.props.onAdd} />
			   			)
			   	})}

			

	      </div>
	  );
	}
}

export default TrackList;