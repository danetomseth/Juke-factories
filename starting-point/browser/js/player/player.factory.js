'use strict';

juke.factory('PlayerFactory', function($rootScope){
	var songList = [];
	var currentSong = {
		playing: false,
		song: null,
		audio: document.createElement('audio')
	};

	
	return {
		//plays given song
		//stops prev song on new song
		start: function(song, songArray) {
			songList = songArray;
			
			//currentSong.audio.pause();
			if(currentSong.song === song) {
				currentSong.playing = false;
				currentSong.audio.pause();
				return;
				//console.log(this)
    		}
    		currentSong.playing = true;
			//this.pause()
			currentSong.song = song;
		    currentSong.audio.src = song.audioUrl;
		    currentSong.audio.load();
		    currentSong.audio.play();
		},
		//calls audios pause
		pause: function() {
			currentSong.audio.pause();
			currentSong.playing = false;

			console.log('Im a current song', currentSong)
		},
		//calls audios play
		resume: function() {

			currentSong.audio.play()
			currentSong.playing = true;
		},
		//return true when song is playing
		isPlaying: function() {
			return currentSong.playing 
		},
		//returns current song, playing or not
		getCurrentSong: function() {
			return currentSong.song;
		},
		next: function() {
			console.log('going to next song')
			this.pause(); 
			var playingSong = songList.indexOf(currentSong.song)
			if(playingSong === songList.length - 1){
				playingSong = 0
			} else {
				playingSong++;
			}
			this.start(songList[playingSong]);
			//console.log(playingSong);
			//$rootScope.$broadcast('next');
		},
		previous: function() {
			console.log('prev song')
			this.pause(); 
			var playingSong = songList.indexOf(currentSong.song)
			if(playingSong === 0){
				playingSong = songList.length - 1
			} else {
				playingSong--;
			}
			this.start(songList[playingSong]); 
			//$rootScope.$broadcast('prev');
		},
		getProgress: function() {
			if(currentSong.song === null){
				return 0;
			}
			return((currentSong.audio.currentTime / currentSong.audio.duration));
			
		},
		autoCycle: function() {

		}
		// currentSong: currentSong

	}
});

  



