import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props){
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.renderAction = this.renderAction.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction(isRemoval) {
    
    if(isRemoval === true) {
      isRemoval = false;
    	return '-';
    }
    else {
      isRemoval = true;
    	return '+';
    }
  }

  addTrack(e) {
    this.props.onAdd(this.props.track);
    let isRemoval = false;
   }

  removeTrack(e) {
    this.props.onRemove(this.props.track);
    let isRemoval = true;
  }

  render() {
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>

        <a className="Track-action" 
          onClick={this.addTrack, this.removeTrack}> 
        {this.renderAction()}
        </a>

      </div>
      );
  }


}

export default Track;