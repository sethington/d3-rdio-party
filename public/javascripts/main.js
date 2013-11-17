$(document).ready(function(){
	var rdioObj = $("#rdio_player");

	// valid token for localhost domain, if you're hosting this somewhere, you'll need to change this token
	rdioObj.rdio("GAlNi78J_____zlyYWs5ZG02N2pkaHlhcWsyOWJtYjkyN2xvY2FsaG9zdEbwl7EHvbylWSWFWYMZwfc=");

	rdioObj.bind('ready.rdio', function(e,userInfo) {
		console.log("user deets", userInfo);
        $(this).rdio().play('t28258102');
    });

	rdioObj.bind('playingTrackChanged.rdio', function(e, playingTrack, sourcePosition) {
		if (playingTrack) {
			rdioObj.rdio().startFrequencyAnalyzer({
				period:50
			});
			
			console.log("track deets", playingTrack);

			$('#art').attr('src', playingTrack.icon);
			$('#track').text(playingTrack.name);
			$('#album').text(playingTrack.album);
			$('#artist').text(playingTrack.artist);
		}
	});

	$("#btPlay").click(function(){
		if ($(this).hasClass("glyphicon-play")){
			rdioObj.rdio().play();
			rdioObj.rdio().startFrequencyAnalyzer({});
			$(this).removeClass("glyphicon-play").addClass("glyphicon-pause");
		}
		else{
			rdioObj.rdio().pause();
			rdioObj.rdio().stopFrequencyAnalyzer({});
			$(this).removeClass("glyphicon-pause").addClass("glyphicon-play");
		}
	});

	$("#btForward").click(function(){
		rdioObj.rdio().next();
	});

	$("#btBack").click(function(){
		rdioObj.rdio().prev();
	});

	var base_data = [0,0,0,0,0,0,0,0];

	var container = d3.select("#party_box svg")
		.attr("width", "100%")
		.attr("height", 500);
		
	var circles = container.selectAll("circle")
		.data(base_data)
		.enter()
		.append("circle");

	rdioObj.bind("updateFrequencyData.rdio", function(e,data){
		//console.log(data); // frequency

		data = data.split(",");
		circles
			.data(data)
			.enter();

		circles
			.attr("cx", function(d,i){
				//console.log(i*5+250);
				return i*150+50;
			})
			.attr("cy", 100)
			.attr("r", function(d, i){
				//console.log(d);
				return d*50.0;
			})
			.style("fill", function(d){
				return "green";
			})
			.transition()
			.delay(10);
	});
})