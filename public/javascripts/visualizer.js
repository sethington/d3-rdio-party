var Visualizer = function(options){
	var self = this,
		base_data = [0,0,0,0,0,0,0,0],
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