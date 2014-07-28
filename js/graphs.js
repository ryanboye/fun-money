var GRAPHS = (function () {
	var GRAPHS = {};

	GRAPHS.updatePeriodView = function (model, d3Selection) {
		var periodData = model.get("transactions");
		d3Selection.datum(processData(periodData));
	};

	GRAPHS.createPeriodView = function (graphelement, model, d3Selection) {
		var periodData = model.get("transactions");
		var displayFormat = model.get("displayFormat");
		var tickInterval = model.get("tickInterval");
		var tickStep = model.get("tickStep");
		var bucketSize = model.get("bucketSize");
		var start = model.get("start");
		var end = model.get("end");
		console.log(periodData);
		console.log(start.format());

		nv.addGraph(function (d3Selection) {
			var chart = nv.models.multiBarChart()
				.transitionDuration(350)
				.reduceXTicks(false) //If 'false', every single x-axis tick label will be rendered.
				.rotateLabels(0) //Angle to rotate x-axis labels.
				.showControls(false) //Allow user to switch between 'Grouped' and 'Stacked' mode.
				.groupSpacing(.1)
				.stacked(true)
				.height(250)
				.margin({
					top: 0,
					right: 20,
					bottom: 0,
					left: 20
				})
				.showLegend(false)


			chart.yAxis
				.tickFormat(function (d) {
					return ""
				})

			var timeFormat = d3.time.format(displayFormat);
			var datedomain = tickInterval.range(start.toDate(), end.toDate(), tickStep);
			var domain = datedomain.map(function (d) {
				return d.getTime();
			});

			var domain = datedomain.map(function (d) {
				return d.getTime();
			});

			chart.xAxis.tickValues(domain);
			chart.xAxis.tickFormat(function (d) {
				var copy = new Date();
				copy.setTime(d);
				return timeFormat(copy);
			});


			chart.xDomain(domain);
			//chart.xRange(domain);



			//.rangeBands([start.toDate().getTime(), end.toDate().getTime()]);


			d3Selection = d3.selectAll(graphelement.toArray());
			var proccessedData = processData(periodData, bucketSize, datedomain);
			d3Selection.datum(proccessedData)
				.call(chart);


			nv.utils.windowResize(chart.update);

			return chart;
		});
	};


	var processData = function (periodData, bucketSize, domain) {

		var graphdata = [{
			key: "spending",
			values: []
        }];

		for (var j = 0; j < domain.length; j++) {
			var newdataum = {
				y: 0,
				x: moment(domain[i]).startOf("day").toDate().getTime()
			};
			graphdata[0].values.push(newdataum);
		}

		for (var i = 0; i < periodData.length; i++) {

			var t = periodData[i];

			var newdataum = {
				y: t.Amount,
				x: t.Date.startOf("day").toDate().getTime()
			};

			graphdata[0].values.push(newdataum);
		}

		return graphdata;
	};

	return GRAPHS;
}());
