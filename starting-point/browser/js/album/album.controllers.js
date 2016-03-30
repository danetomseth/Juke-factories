'use strict';

juke.controller('AlbumCtrl', function($scope, $http, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {
    $scope.albumArray = [];
    $scope.singleAlbum = []
    $scope.oneAlbum  =[];
    $scope.playing = false;
    
    $scope.allAlbums = [];
    $rootScope.albumDatabase = [];
    AlbumFactory.fetchAll()
    .then(function(response){
        $scope.allAlbums = response;
        $scope.oneAlbum = AlbumFactory.fetchOneAlbum($scope.allAlbums[0]);
        return AlbumFactory.fetchById($scope.oneAlbum._id);
    })
    .then(function(res){
        //console.log(res)
        $scope.oneAlbum = res;
    })



    $scope.toggle = function(song) {
        $scope.currentSong = song;
        
        
        if(PlayerFactory.isPlaying()){
            $scope.playing = false;
            PlayerFactory.pause();
        } else{
            
            $scope.playing = true;
            PlayerFactory.start(song, $scope.albumArray);   
        }
        $rootScope.$broadcast('play', song);
    };

    $scope.play = function(){
        return PlayerFactory.resume();
    }
    $scope.pause = function(){
        return PlayerFactory.pause();
    }
    $scope.currentSong = function(){
        return PlayerFactory.getCurrentSong();
        
    }
    $scope.next = function(){
        return PlayerFactory.next();
        
    }
    $scope.pre = function(){
        return PlayerFactory.previous();
        
    }
    // incoming events (from Player, toggle, or skip)
    // $scope.$on('pause', pause);
    // $scope.$on('play', play);
    // $scope.$on('next', next);
    // $scope.$on('prev', prev);

    // functionality
    // function pause() {
    //     $scope.playing = false;
    // }

    // function play(event, song) {
    //     $scope.playing = true;
    //     $scope.currentSong = song;
    // };

    // a "true" modulo that wraps negative to the top of the range
    // function mod(num, m) {
    //     return ((num % m) + m) % m;
    // };

    // // jump `interval` spots in album (negative to go back, default +1)
    // function skip(interval) {
    //     if (!$scope.currentSong) return;
    //     var index = $scope.currentSong.albumIndex;
    //     index = mod((index + (interval || 1)), $scope.album.songs.length);
    //     $scope.currentSong = $scope.album.songs[index];
    //     if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
    // };

    // function next() {
    //     skip(1);
    // };

    // function prev() {
    //     skip(-1);
    // };

});

juke.controller('AllAlbumsController', function($scope, $http, $rootScope, $log, StatsFactory, AlbumFactory) {
  $scope.allAlbums = [];
  $rootScope.albumDatabase = [];
  AlbumFactory.fetchAll()
    .then(function(response){
        $scope.allAlbums = response;
    })
})




