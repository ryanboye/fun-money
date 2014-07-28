var App = new Marionette.Application();

App.addRegions({
	"today": "#today",
	"week": "#week",
	"month": "#month",
	"year": "#year"
});

var TodayView = Marionette.ItemView.extend({
	className: 'view',
	template: "#todayView",
	modelEvents: {
		'change': 'fieldsChanged'
	},
	events: {
		"click .name": "prevDate"
	},
	fieldsChanged: function () {
		this.render();
	},
	prevDate: function () {
		update(currDate.subtract('days', 1), 80000);
	}
});

var PeriodView = Marionette.ItemView.extend({
	className: 'view',
	template: "#periodView",
	modelEvents: {
		'change': 'fieldsChanged'
	},
	fieldsChanged: function () {
		this.render();
		if (this.d3Selection !== null) {
			GRAPHS.updatePeriodView(this.model, this.d3Selection);
		}
	},
	d3Selection: null,
	onRender: function () {
		if (this.d3Selection === null) {
			var graphdiv = this.$el.find(".graph");
			GRAPHS.createPeriodView(graphdiv, this.model, this.d3Selection);
		}
	}
});

var TimePeriod = Backbone.Model.extend({
	name: "Period",
	date: moment().format('MMMM Do YYYY'),
	spent: 100,
	budget: 100,
	status: "neutral",
	profit: 0,
	transactions: [],
	displayFormat: "",
	start: moment(),
	end: moment(),
	d3Selection: null,
	tickInterval: d3.time.day,
	tickStep: 2,
	bucketSize: "day"
});

var day = new TimePeriod();
var week = new TimePeriod({
	displayFormat: "%a",
	tickInterval: d3.time.day,
	tickStep: 1
});
var month = new TimePeriod({
	displayFormat: "%e",
	tickInterval: d3.time.day,
	tickStep: 2
});
var year = new TimePeriod({
	displayFormat: "%m",
	tickInterval: d3.time.month,
	tickStep: 1,
	bucketSize: "month"
});

// wire up views to their models
var todayView = new TodayView({
	model: day
});
var weekView = new PeriodView({
	model: week
});
var monthView = new PeriodView({
	model: month
});
var yearView = new PeriodView({
	model: year
});


var dataForPeriod = function (period, name) {
	return {
		name: name,
		spent: Math.round(period.spent),
		budget: Math.round(period.budget),
		status: period.budget - period.spent > 0 ? "positive" : "negative",
		profit: Math.round(period.budget - period.spent),
		transactions: period.transactions,
		start: period.beginPeriod,
		end: period.endPeriod
	};
};

var update = function (targetdate, budget) {

	var stats = STATS.get(data, targetdate, budget);

	day.set(dataForPeriod(stats.day, targetdate.format('MMMM Do YYYY')));
	week.set(dataForPeriod(stats.week, "This Week"));
	month.set(dataForPeriod(stats.month, "This Month"));
	year.set(dataForPeriod(stats.year, "This Year"));

};

var data = STATS.loadData();
var currDate = moment();
update(currDate, 80000);

App.today.show(todayView);
App.week.show(weekView);
App.month.show(monthView);
App.year.show(yearView);
