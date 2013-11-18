var Visualizer = function(options){
	var self = this,
		base_data = [.25,.50,.72,.20,.90,.80,.10,.22],
		container = options.container,
		container_height = $(options.container[0]).height();

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
		var eq = container.selectAll("rect").data(data);

		var y = d3.scale.linear().range([1,container_height-20]);
		y.domain([0,100]);

		eq.enter().append("rect");
			
		eq.exit()
		    .transition()
		    .duration(10)
		    .ease("exp")
		    .attr("width", 0)
		    .remove();

		eq.transition().delay(10).attr("x", function(d,i){ return i*50 + 15;})
			.attr("y", function(d,i){ return container_height-y(d*100);})
			.attr("height", function(d,i){ return y(d*100);})
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