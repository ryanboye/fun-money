var App = new Marionette.Application();

App.addRegions({
	"today": "#today",
	"week": "#week",
	"month": "#month",
	"year": "#year"
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
	var profit = Math.round(period.budget - period.spent);
	return {
		name: name,
		spent: Math.round(period.spent),
		budget: Math.round(period.budget),
		status: period.budget - period.spent > 0 ? "positive" : "negative",
		profit: profit,
		dailyPrecent: Math.max(Math.round(((period.budget - period.spent) / period.budget) * 100), 0),
		transactions: period.transactions,
		start: period.beginPeriod,
		end: period.endPeriod
	};
};

var update = function (targetdate, budget) {

	var stats = statProvider.get(targetdate, budget);

	day.set(dataForPeriod(stats.day, targetdate.format('MMMM Do YYYY')));
	week.set(dataForPeriod(stats.week, "This Week"));
	month.set(dataForPeriod(stats.month, "This Month"));
	year.set(dataForPeriod(stats.year, "This Year"));

};

var statProvider = new MONEY.GetStatProvider();
var currDate = moment();
update(currDate, 80000);

App.today.show(todayView);
App.week.show(weekView);
App.month.show(monthView);
App.year.show(yearView);
