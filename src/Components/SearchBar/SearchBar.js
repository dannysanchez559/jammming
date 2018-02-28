import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

	constructor(props) {
		super(props);

		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
		this.handleEnter = this.handleEnter.bind(this);
	}
	search() {
		this.props.onSearch(this.state.term);
	}

	handleTermChange(event) {
		this.setState({term: event.target.value});
	}

	handleEnter(event) {
		if(event.key === 'Enter') {
			this.search();
		}
	}

	render() {
      return(
      	<div className="SearchBar">
        <input 
        	onChange={this.handleTermChange} 
        	placeholder="Enter A Song, Album, or Artist"
        	onKeyPress={this.handleEnter} />
        <a onClick={this.search}>SEARCH</a>
      </div>
			);
	}
}

export default SearchBar;