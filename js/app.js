var angular = angular || {};

var app = angular.module('tubeclash', ['googlechart']);

app.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    // var clashers = [
    //   {
    //       name: "Sturmwaffel",
    //       videoID: "W-RFpnvjHss"
    //   },
    //   {
    //       name: "Stegi",
    //       videoID: "YVHHe7lYQJU"
    //   },
    //   {
    //       name: "Rotpilz",
    //       videoID: "nQlnnyK4cEE"
    //   },
    //   {
    //       name: "Rewinside",
    //       videoID: "LTZGuIERMu0"
    //   },
    //   {
    //       name: "Paluten",
    //       videoID: "RXFFGiAJU28"
    //   },
    //   {
    //       name: "Mirellativegal",
    //       videoID: "IFCGf8P2t3E"
    //   },
    //   {
    //       name: "LifeWithMelina",
    //       videoID: "0v8LZK8jBSE"
    //   },
    //   {
    //       name: "Kurono",
    //       videoID: "c63-oEGFvXQ"
    //   },
    //   {
    //       name: "Julien Bam",
    //       videoID: "rKEREe8P3jQ"
    //   },
    //   {
    //       name: "Joyce",
    //       videoID: "yoLqgF2Drns"
    //   },
    //   {
    //       name: "Joon",
    //       videoID: "KBqQyF42NXQ"
    //   },
    //   {
    //       name: "Izzi",
    //       videoID: "sgIOd_MeDXw"
    //   },
    //   {
    //       name: "HoneyBall",
    //       videoID: "bp_W5MRDTrI"
    //   },
    //   {
    //       name: "Herr Bergmann",
    //       videoID: "l0_qN4VTck0"
    //   },
    //   {
    //       name: "HandOfBlood",
    //       videoID: "LdspJgJ1LfE"
    //   },
    //   {
    //       name: "BrokenThumbs - Manuel",
    //       videoID: "OIoqiAYWHcU"
    //   },
    //   {
    //       name: "BrokenThumbs - Malte",
    //       videoID: "mTLgrHVrVBA"
    //   },
    //   {
    //       name: "Dner",
    //       videoID: "m59yYcEWO_U"
    //   },
    //   {
    //       name: "Dagi Bee",
    //       videoID: "70FS62wL_vI"
    //   },
    //   {
    //       name: "ConCrafter",
    //       videoID: "FswGt2EJw4A"
    //   },
    //   {
    //       name: "BreedingUnicorns",
    //       videoID: "GgcLJ-iLhns"
    //   },
    // ];
    
    
    $scope.scoreboard = [{
        name: "Xamfy",
        channelID: "UClP15K-e6bwxkwuHID08cbg",
        videoID: "3IQrm987Dug",
        upvotes: 20,
        downvotes: 5,
        score: 15,
        chartVisible: false,
        history: [
            {
                date: "Thu, 27 Aug 2015 10:00:00 +0200",
                upvotes: 5,
                downvotes: 1,
                score: 4
            },
            {
                date: "Thu, 27 Aug 2015 19:00:00 +0200",
                upvotes: 8,
                downvotes: 1,
                score: 7
            },
            {
                date: "Fri, 28 Aug 2015 10:00:00 +0200",
                upvotes: 9,
                downvotes: 1,
                score: 8
            },
            {
                date: "Fri, 28 Aug 2015 19:00:00 +0200",
                upvotes: 10,
                downvotes: 3,
                score: 7
            },
            {
                date: "Sat, 29 Aug 2015 10:00:00 +0200",
                upvotes: 17,
                downvotes: 3,
                score: 14
            }    
        ]
    }];
    
    // $scope.getVotes = function() {
    //     $scope.scoreboard = [];
        
    //     angular.forEach(clashers, function(clasher, key) {
            
    //         $http.get("https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCucd8f8VywrToMHrpdrM4x7K76fp__vTY&part=statistics&id="+ clasher.videoID).success(function(data) {
    //             $scope.scoreboard.push({
    //                 name: clasher.name,
    //                 votes: parseInt(data.items[0].statistics.viewCount),
    //                 videoID: clasher.videoID
    //             });
    //         })
    //     });
    // }
    
    // $scope.getVotes();
    
    $scope.generateGraphData = function(scoreEntry) {
        var chartObject = {
          "type": "LineChart",
          "displayed": true,
          "data": {
            "cols": [
              {
                "id": "date",
                "label": "Datum",
                "type": "date",
                "p": {}
              },
              {
                "id": "upvotes",
                "label": "Upvotes",
                "type": "number",
                "p": {}
              },
              {
                "id": "downvotes",
                "label": "Downvotes",
                "type": "number",
                "p": {}
              },
              {
                "id": "score",
                "label": "Score",
                "type": "number",
                "p": {}
              }
            ],
            "rows": []
          },
          "options": {
            "title": "Verlauf von " + scoreEntry.name,
            "isStacked": "true",
            "fill": 20,
            "displayExactValues": true,
            "vAxis": {
              "gridlines": {
                "count": 10
              }
            },
            "hAxis": {
              "title": "Datum"
            }
          },
          "formatters": {}
        }
        
        angular.forEach(scoreEntry.history, function(value){
            var historyEntry = 
              {
                "c": [
                  {
                    "v": new Date(value.date)
                    // "v": Date(2015,08,25,13,33,25)
                  },
                  {
                    "v": value.upvotes
                  },
                  {
                    "v": value.downvotes
                  },
                  {
                    "v": value.score
                  }
                ]
              };
            
            chartObject.data.rows.push(historyEntry);
        });
        
        return chartObject;
    }
    
    angular.forEach($scope.scoreboard, function(scoreEntry, key) {
      $scope.scoreboard[key].chartObject = $scope.generateGraphData(scoreEntry);
    });
    
    console.log($scope.scoreboard);
    
    $scope.toggleGraphFor = function(key) {
        
        if ($scope.scoreboard[key].chartVisible)
            $scope.scoreboard[key].chartVisible = false;
        else
            $scope.scoreboard[key].chartVisible = true;
            
        console.log($scope.scoreboard);
    };
    
    
    
    $scope.imprintVisible = false;
    
    $scope.toggleImprint = function() {
        console.log("yolo");
        console.log($scope.imprintVisible);
        if ($scope.imprintVisible)
            $scope.imprintVisible = false;
        else
            $scope.imprintVisible = true;
    }
}]);