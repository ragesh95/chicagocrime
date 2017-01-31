var	margin = {top: 30, right: 40, bottom: 30, left: 50},
	width = 600 - margin.left - margin.right,
	height = 270 - margin.top - margin.bottom;

//var	parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.scale.ordinal()
    .rangeRoundBands([0,width], 0.2,0.2);
var	y = d3.scale.linear().range([height, 0]);

 var	xAxis = d3.svg.axis().scale(x)
 	.orient("bottom");

var	yAxis = d3.svg.axis().scale(y)
	.orient("left");

var	valueline = d3.svg.line()
	.x(function(d) { return x(d.year); })
	.y(function(d) { return y(d.ARRESTED); });

var	valueline2 = d3.svg.line()
	.x(function(d) { return x(d.year); })
	.y(function(d) { return y(d.NOTARRESTED); });

var	svg = d3.select("#multiline")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("../json/linejson.json", function(error, data) {
	data.forEach(function(d) {
		d.year = d.year;
		d.ARRESTED = +d.ARRESTED;
		d.NOTARRESTED = +d.NOTARRESTED;
	});

  x.domain(data.map(function(d){
      return d.year;
  }));
	// Scale the range of the data
	//x.domain(d3.extent(data, function(d) { return d.countries; }));
	y.domain([0, d3.max(data, function(d) { return Math.max(d.ARRESTED, d.NOTARRESTED); })]);

	svg.append("path")		// Add the valueline path.
		.attr("class", "line")
    .style("stroke", "red")
		.attr("d", valueline(data));

	svg.append("path")		// Add the valueline2 path.
		.attr("class", "line")
		.style("stroke", "green")
		.attr("d", valueline2(data));



	svg.append("g")			// Add the X Axis
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")			// Add the Y Axis
		.attr("class", "y axis")
		.call(yAxis);

	svg.append("text")
		.attr("transform", "translate(" + (width+3) + "," + y(data[0].ARRESTED) + ")")
		.attr("dy", ".35em")
		.attr("text-anchor", "start")
		.style("fill", "red")
		.text("Arrested");

	svg.append("text")
		.attr("transform", "translate(" + (width+3) + "," + y(data[0].NOTARRESTED) + ")")
		.attr("dy", ".35em")
		.attr("text-anchor", "start")
		.style("fill", "green")
		.text("hjbhj");

});
