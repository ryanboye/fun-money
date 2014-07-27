var GRAPHS = (function () {
	var GRAPHS = {};

	GRAPHS.updatePeriodView = function (model, d3Selection) {
		var periodData = model.get("transactions");
		d3Selection.datum(processData(periodData));
	};

	GRAPHS.createPeriodView = function (graphelement, model, d3Selection) {
		var periodData = model.get("transactions");
		var displayFormat = model.get("displayFormat");
		var start = model.get("start")
		var end = model.get("end");
		console.log(periodData);
		console.log(start.format());

		nv.addGraph(function (d3Selection) {
			var chart = nv.models.multiBarChart()
				.transitionDuration(350)
				.reduceXTicks(false) //If 'false', every single x-axis tick label will be rendered.
				.rotateLabels(0) //Angle to rotate x-axis labels.
				.showControls(false) //Allow user to switch between 'Grouped' and 'Stacked' mode.
				.groupSpacing(0.1)
				.stacked(true)
				.height(250)
				.margin({
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				})
				.showLegend(false)


			chart.yAxis
				.tickFormat(function (d) {
					return ""
				})


			chart.xAxis
				.tickFormat(d3.time.format(displayFormat));

			var scale = d3.time.scale();
			scale.range([start.toDate(), end.toDate()]);
			scale.invert();
			scale.ticks(d3.time.day, 1);

			chart.xAxis
				.scale(scale);


			d3Selection = d3.selectAll(graphelement.toArray());
			d3Selection.datum(processData(periodData))
				.call(chart);


			nv.utils.windowResize(chart.update);

			return chart;
		});
	};


	//Generate some nice data.
	var processData = function (periodData) {

		var graphdata = [{
			key: "spending",
			values: []
        }];
		for (var i = 0; i < periodData.length; i++) {

			var t = periodData[i];

			var newdataum = {
				y: t.Amount,
				x: t.Date.toDate()
			};

			graphdata[0].values.push(newdataum);
		}



		return graphdata;
	};

	return GRAPHS;
}());
