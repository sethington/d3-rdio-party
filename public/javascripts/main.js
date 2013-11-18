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

var Visualizer = function(options){
	var self = this;
	
	var base_data = [0,0,0,0,0,0,0,0],
		container = options.container;

	self.api = {
		'setRenderer': function(renderer){
			options.mode = renderer;
			$(container[0]).empty();
		},
		'render': function(data){
			self.render(data);
		}
	};

	self.render = function(data){
		switch(options.mode){
			case "eq":
				self.renderEQ(data);
				break;
			case "circles":
				self.renderCircles(data);
				break;
		}
	};

	self.renderEQ = function(data){
		var eq = container.selectAll("g");

		if (eq[0].length === 0){
			eq
				.data(base_data)
				.enter()
				.append("g");
		}

		eq.data(data).enter();

		eq.append("rect")
			.attr("x", function(d,i){return i*50 + 15;})
			.attr("y", function(d,i){return d * 50;})
			.attr("height", function(d,i){ return d*50;})
			.attr("width", "15px")
			.style("fill", function(d){
				return "green";
			});

	};

	self.renderCircles = function(data){
		var self = this;
		var circles = container.selectAll("circle");

		if (circles[0].length === 0){
			circles
				.data(base_data)
				.enter()
				.append("circle");
		}

		circles.data(data).enter();

		circles
			.attr("cx", function(d,i){
				return i*150+50;
			})
			.attr("cy", 100)
			.attr("r", function(d, i){
				return d*50.0;
			})
			.style("fill", function(d){
				return "green";
			});
	};

	return self.api;
};