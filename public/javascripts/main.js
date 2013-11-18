$(document).ready(function(){
	var rdioObj = $("#rdio_player");

	// valid token for localhost domain, if you're hosting this somewhere, you'll need to change this token
	rdioObj.rdio("GAlNi78J_____zlyYWs5ZG02N2pkaHlhcWsyOWJtYjkyN2xvY2FsaG9zdEbwl7EHvbylWSWFWYMZwfc=");

	rdioObj.bind('ready.rdio', function(e,userInfo) {
		console.log("user deets", userInfo);
        $(this).rdio().play('a2660305');
    });

    $("#albums").change(function(e){
    	var song_val = $(this).val();
    	rdioObj.rdio().play(song_val);
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
		rdioObj.rdio().previous();
	});

	var container = d3.select("#party_box svg")
		.attr("width", "100%")
		.attr("height", 500);

	var visualizer = Visualizer({
		"container": container,
		"mode": "circles"
	});
	
	rdioObj.bind("updateFrequencyData.rdio", function(e,data){
		data = data.split(",");

		// pass data to renderer
		visualizer.render(data);
	});

	$("#renderer").change(function(e){
		visualizer.setRenderer($(this).val());
	});
});

