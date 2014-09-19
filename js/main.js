function calculate(index, last, callback) {
$.ajax({
    dataType: "json",
    url: "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCucd8f8VywrToMHrpdrM4x7K76fp__vTY&part=statistics&id="+ videos[index].url,
    success: function(data) {

      videos[index].likeCount=data.items[0].statistics.likeCount;
      videos[index].dislikeCount=data.items[0].statistics.dislikeCount;
      var points=videos[index].likeCount - videos[index].dislikeCount;
      videos[index].change = videos[index].points - points;
      videos[index].points = points;

      if (!last) {
      	var isnextlast = false;
      	if (index +1 == (videos.length - 1))
      		isnextlast = true;

      	calculate(index + 1, isnextlast, callback);
      }
      else {
      	callback();
      }
    }
  });
}

function doitnow() {
	calculate(0, false, afterGettingData);
}

function afterGettingData(){
	videos.sort(function(a, b) {
		if (a.points > b.points) return -1;
		if (a.points < b.points) return 1;
		return 0;
	});

	jQuery('#resultlist tbody').empty();

	videos.every(function(element, index, array) {
		jQuery('#resultlist tbody').append(
			'<tr class="clash-' +
			videos[index].clash + 
			'"><td>' + 
			videos[index].name + 
			'</td><td>' + 
			videos[index].points + 
			'</td><td>' + 
			videos[index].change + 
			'</td></tr>');

		return true;
	});

	jQuery('#last-refresh').html(moment().format("l HH:mm:ss"));
}

var videos = [
	{
		name: "LeFloid",
		url: "MFDX2AxKsQE",
		clash: "a"
	},
	{
		name: "Taddl",
		url: "LTCXvctM3ho",
		clash: "a"
	},
	{
		name: "Gronkh",
		url: "Qj9wVeGuIPQ",
		clash: "b"
	},
	{
		name: "GLP",
		url: "dtunekJ0rkY",
		clash: "b"
	},
	{
		name: "Coldmirror",
		url: "gej21WMdNEc",
		clash: "b"
	},
	{
		name: "Dr. Allwissend",
		url: "qjeoOu4BRsA",
		clash: "b"
	}
];

moment.locale('de');

videos.every(function(element, index, array) {
	jQuery('#votenowbox .content ul').append(
		'<li>' +
		'<a class="clash-'+
		videos[index].clash +
		'" href="http://youtube.com/watch?v=' +
		videos[index].url + 
		'" target="_blank">' +
		videos[index].name +
		'</a></li>');

	return true;
});

doitnow();
setInterval(function() {
	doitnow();
},5000);