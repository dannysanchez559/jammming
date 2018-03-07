const client_id = '6e01da261ab844e7abf0d39d93d49200';
/*const redirect_uri = 'https://myapp-jammming.surge.sh';*/
const redirect_uri = 'https://myapp-jammming.surge.sh';

let accessToken = undefined;
let expiresIn = undefined;

let Spotify = {

	getAccessToken() {
		// return userToken if already set
		if(accessToken) {		
			return accessToken;
		}

		// match access token, match expiration time from window url
		const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
		const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
	
	    //if AccessToken, and expiresIn, set variables.
		if(urlAccessToken && urlExpiresIn) {
		  // set access token value, [1] = value in parenthesis
		  accessToken = urlAccessToken[1];

		  // set expiration time value
		  expiresIn = urlExpiresIn[1]; 

		  // wipe access token, and URL parameter
		  window.setTimeout(() => accessToken = '',
		  	expiresIn * 1000);
		  window.history.pushState('Access Token', null, '/');
		}

	    //  acessToken is empty, and not in URL. redirect user
	    else {
	    	window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
	    }
	    },

	search(searchTerm) {
		
		return fetch('https://api.spotify.com/v1/search?type=track&q=' + searchTerm, {
			headers: {Authorization: `Bearer ${accessToken}`}
			})
		.then(response => response.json())
		.then(jsonResponse => {
			console.log(jsonResponse);
			if(!jsonResponse.tracks) return [];
			return jsonResponse.tracks.items.map(track => {
				return {
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					album: track.album.name,
					uri: track.uri					
				}

			})
		});

	},

	savePlaylist(name, trackUris) {
		if(!name || !trackUris || trackUris.length === 0) {
			return;
		}
		/*console.log(name);
		console.log(trackUris);*/

		let userID = undefined;
		let playlistID = undefined;
		/*console.log(accessToken); // true*/

		// save current user ID to userID
		fetch('https://api.spotify.com/v1/me', {
			headers: {Authorization: `Bearer ${accessToken}`} 
		})
		.then(response => response.json())
		.then(jsonResponse => userID = jsonResponse.id)

		// use userID to create post playlist, with name and tracks
		.then(() => {
		fetch(`https://api.spotify.com/v1/users/dannyvdub/playlists`, {
			method: 'POST',
		 	headers: {Authorization: `Bearer ${accessToken}`},
			body: JSON.stringify({
				name: name
				})
			})
		 .then(response => response.json())
		 .then(jsonResponse => playlistID = jsonResponse.id)
		 /*.then(checkID => console.log(checkID))*/

		 // use userID and playlistID to add tracks to user playlist
		 .then(() => {
		 	fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
		 		method: 'POST',
		 		headers: {Authorization: `Bearer ${accessToken}`},
		 		body: JSON.stringify({
		 			uris: trackUris
		 		})
		 	});
	     /*.then(checkResponse => console.log(checkResponse));*/			})
		})
	}
};

export default Spotify;