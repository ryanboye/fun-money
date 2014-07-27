var GRAPHS = (function () {
    var GRAPHS = {};

    GRAPHS.createPeriodView = function (graphelement, model) {
        var periodData = model.get("transactions");
        var displayFormat = model.get("displayFormat");
        var start = model.get("start")
        var end = model.get("end");
        console.log(periodData);
        console.log(start.format());

        nv.addGraph(function () {
            var chart = nv.models.multiBarChart()
                .transitionDuration(350)
                .reduceXTicks(true) //If 'false', every single x-axis tick label will be rendered.
                .rotateLabels(90) //Angle to rotate x-axis labels.
                .showControls(false) //Allow user to switch between 'Grouped' and 'Stacked' mode.
                .groupSpacing(0.1)
                .stacked(true)
                .height(250)
                .margin({top: 0, right: 0, bottom: 0, left: 0})
                .showLegend(false);

            chart.yAxis
                .tickFormat(d3.format('$,d'));

            chart.xAxis
                .tickFormat(function (d) {
                    return d3.time.format(displayFormat)(new Date(d))
                });


            d3.selectAll(graphelement.toArray())
                .datum(processData(periodData))
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
