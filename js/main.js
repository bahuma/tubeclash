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
		url: "cPukKe-x0-g",
		clash: "a"
	},
	{
		name: "Taddl",
		url: "cFvhkChiQgI",
		clash: "a"
	},
	{
		name: "Chan",
		url: "XWGUmpTDlZI",
		clash: "a"
	},
	{
		name: "IBlali",
		url: "e1Yb8bzYcCs",
		clash: "a"
	},
	{
		name: "Gronkh",
		url: "t9WBdGz_jTw",
		clash: "b"
	},
	{
		name: "GLP",
		url: "yZ2LqHkOqaA",
		clash: "b"
	},
	{
		name: "Coldmirror",
		url: "I_X9mdW7b5g",
		clash: "b"
	},
	{
		name: "Dr. Allwissend",
		url: "-jm1ui_kuZY",
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