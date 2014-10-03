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
			'<tr><td>' + 
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
		name: "Taddl",
		url: "h8NPhPjpfXs"
	},
	{
		name: "Gronkh",
		url: "Bmye9jJ5nSY"
	},
	{
		name: "GLP",
		url: "LN6-V0e1XAk"
	},
	{
		name: "Coldmirror",
		url: "sceDX05JVqk"
	},
	{
		name: "Dr. Allwissend",
		url: "pEK2OavX6Qo"
	}
];

moment.locale('de');

videos.every(function(element, index, array) {
	jQuery('#votenowbox .content ul').append(
		'<li>' +
		'<a href="http://youtube.com/watch?v=' +
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