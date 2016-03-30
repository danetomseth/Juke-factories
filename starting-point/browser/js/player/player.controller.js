'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {
   var audio = document.createElement('audio');
  //$scope.currentSong = PlayerFactory.getCurrentSong();
  //$scope.playing = false;
  //$scope.currentSong = false;
  $scope.$on('play', function(event, data) {
    console.log('player factory', data);
    $scope.currentSong = data;
    $scope.playing = PlayerFactory.isPlaying();
    console.log('playing stat', PlayerFactory.isPlaying())
  })
  audio.addEventListener('ended', function () {
    PlayerFactory.next();
    $scope.$evalAsync(); // likely best, schedules digest if none happening
  });
  audio.addEventListener('timeupdate', function () {
    //$scope.progress = 100 * audio.currentTime / audio.duration;
    $scope.progress = PlayerFactory.getProgress();
    // $scope.$digest(); // re-computes current template only (this scope)
    $scope.$evalAsync(); // likely best, schedules digest if none happening
  });

  
  $scope.toggle = function () {
    if (PlayerFactory.isPlaying()) {
      PlayerFactory.pause();
    }
    else PlayerFactory.start();
  };

  // incoming events (from Album or toggle)
  // $scope.$on('pause', PlayerFactory.pause);
  // $scope.$on('play', PlayerFactory.start);


  $scope.prev = PlayerFactory.previous
  $scope.next = PlayerFactory.next
  
  // var audio = document.createElement('audio');
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

  // // state
  // $scope.currentSong;
  // $scope.playing = false;

  // // main toggle
  // $scope.toggle = function (song) {
  //   if ($scope.playing) $rootScope.$broadcast('pause');
  //   else $rootScope.$broadcast('play', song);
  // };

  // // incoming events (from Album or toggle)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);

  // // functionality
  // function pause () {
  //   audio.pause();
  //   $scope.playing = false;
  // }
  // function play (event, song){
  //   // stop existing audio (e.g. other song) in any case
  //   pause();
  //   $scope.playing = true;
  //   // resume current song
  //   if (song === $scope.currentSong) return audio.play();
  //   // enable loading new song
  //   $scope.currentSong = song;
  //   audio.src = song.audioUrl;
  //   audio.load();
  //   audio.play();
  // }

  // // outgoing events (to Album… or potentially other characters)
  // $scope.next = function () { pause(); $rootScope.$broadcast('next'); };
  // $scope.prev = function () { pause(); $rootScope.$broadcast('prev'); };

});
