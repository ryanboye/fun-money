TimePeriod = Backbone.Model.extend({
	name: "Period",
	date: moment().format('MMMM Do YYYY'),
	spent: 100,
	budget: 100,
	status: "neutral",
	profit: 0,
	dailyPrecent: 0,
	transactions: [],
	displayFormat: "",
	start: moment(),
	end: moment(),
	d3Selection: null,
	tickInterval: d3.time.day,
	tickStep: 2,
	bucketSize: "day"
});
