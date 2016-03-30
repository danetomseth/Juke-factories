juke.factory('StatsFactory', function ($q) {
  var statsObj = {};
  statsObj.totalTime = function (album) {
    var audio = document.createElement('audio');
    return $q(function (resolve, reject) {
      var sum = 0;
      var n = 0;
      function resolveOrRecur () {
        if (n >= album.songs.length) resolve(sum);
        else audio.src = album.songs[n++].audioUrl;
      }
      audio.addEventListener('loadedmetadata', function () {
        sum += audio.duration;
        resolveOrRecur();
      });
      resolveOrRecur();
    });
  };
  return statsObj;
});

juke.factory('AlbumFactory', function($http, $log){
  var allAlbums = [];

  return {
    fetchAll: function(){
      return $http.get('/api/albums/')
        .then(function(res) {
            res.data.forEach(function(album) {
              album.imageUrl = '/api/albums/' + album._id + '.image';
            })
            console.log('all data',res.data);
            return res.data;
        })
        .catch($log.error); // $log service can be turned on and off; also, pre-bound
    },
    fetchOneAlbum: function(album){
            album.imageUrl = '/api/albums/' + album._id + '.image';
            album.songs.forEach(function(song, i) {
                song.audioUrl = '/api/songs/' + song._id + '.audio';
                song.albumIndex = i;
            })
            console.log(album)
            return album
          
    },

    fetchById: function(id){
      return $http.get('/api/albums/' + id)
      .then(function(res){
          res.data.imageUrl = '/api/albums/' + res.data._id + '.image';
          res.data.songs.forEach(function(song, i) {
              song.audioUrl = '/api/songs/' + song._id + '.audio';
              song.albumIndex = i;
          })
        return res.data
      })

    }
  }
})

