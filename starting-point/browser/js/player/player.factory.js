'use strict';

juke.factory('PlayerFactory', function($rootScope){
	var songList = [];
	var currentSong = {
		playing: false,
		song: null,
		audio: document.createElement('audio')
	};
	
	return {
		start: function(song, songArray) {
			songList = songArray;
			
			//currentSong.audio.pause();
			this.pause()
    		currentSong.playing = true;
		    // resume current song
		    //if (song === currentSong.song) return currentSong.audio.play();
			currentSong.song = song;
		    currentSong.audio.src = song.audioUrl;
		    currentSong.audio.load();
		    currentSong.audio.play();
		},
		pause: function() {
			currentSong.audio.pause();
			currentSong.playing = false;
		},
		resume: function() {
			currentSong.audio.play()
			currentSong.playing = true;
		},
		isPlaying: function() {
			return currentSong.playing 
		},
		getCurrentSong: function() {

			return currentSong.song;
		},
		next: function() {
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

	}
});

  
  // audio.addEventListener('ended', function () {
  //   $scope.next();
  //   // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });
  // audio.addEventListener('timeupdate', function () {
  //   $scope.progress = 100 * audio.currentTime / audio.duration;
  //   // $scope.$digest(); // re-computes current template only (this scope)
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });


