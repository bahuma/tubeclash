var app = angular.module('tubeclash', []);

app.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    var clashers = [
      {
          name: "Sturmwaffel",
          videoID: "W-RFpnvjHss"
      },
      {
          name: "Stegi",
          videoID: "YVHHe7lYQJU"
      },
      {
          name: "Rotpilz",
          videoID: "nQlnnyK4cEE"
      },
      {
          name: "Rewinside",
          videoID: "LTZGuIERMu0"
      },
      {
          name: "Paluten",
          videoID: "RXFFGiAJU28"
      },
      {
          name: "Mirellativegal",
          videoID: "IFCGf8P2t3E"
      },
      {
          name: "LifeWithMelina",
          videoID: "0v8LZK8jBSE"
      },
      {
          name: "Kurono",
          videoID: "c63-oEGFvXQ"
      },
      {
          name: "Julien Bam",
          videoID: "rKEREe8P3jQ"
      },
      {
          name: "Joyce",
          videoID: "yoLqgF2Drns"
      },
      {
          name: "Joon",
          videoID: "KBqQyF42NXQ"
      },
      {
          name: "Izzi",
          videoID: "sgIOd_MeDXw"
      },
      {
          name: "HoneyBall",
          videoID: "bp_W5MRDTrI"
      },
      {
          name: "Herr Bergmann",
          videoID: "l0_qN4VTck0"
      },
      {
          name: "HandOfBlood",
          videoID: "LdspJgJ1LfE"
      },
      {
          name: "BrokenThumbs - Manuel",
          videoID: "OIoqiAYWHcU"
      },
      {
          name: "BrokenThumbs - Malte",
          videoID: "mTLgrHVrVBA"
      },
      {
          name: "Dner",
          videoID: "m59yYcEWO_U"
      },
      {
          name: "Dagi Bee",
          videoID: "70FS62wL_vI"
      },
      {
          name: "ConCrafter",
          videoID: "FswGt2EJw4A"
      },
      {
          name: "BreedingUnicorns",
          videoID: "GgcLJ-iLhns"
      },
    ];
    
    
    $scope.scoreboard = [];
    
    $scope.getVotes = function() {
        $scope.scoreboard = [];
        
        angular.forEach(clashers, function(clasher, key) {
            
            $http.get("https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCucd8f8VywrToMHrpdrM4x7K76fp__vTY&part=statistics&id="+ clasher.videoID).success(function(data) {
                $scope.scoreboard.push({
                    name: clasher.name,
                    votes: parseInt(data.items[0].statistics.viewCount),
                    videoID: clasher.videoID
                });
            })
        });
    }
    
    $scope.getVotes();
}]);