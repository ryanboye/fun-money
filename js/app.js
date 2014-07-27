var App = new Marionette.Application();

App.addRegions({
    "today": "#today",
    "week": "#week",
    "month": "#month"
});

var TodayView = Marionette.ItemView.extend({
    className: 'view',
    template: "#todayView" 
});

var PeriodView = Marionette.ItemView.extend({
    className: 'view',
    template: "#periodView" 
});


var Today = Backbone.Model.extend({
	name: "Today",
	date: "July 24, 2014",
	spent: 16,
	budget: 50,
	profit: budget - spent,
});
var today = new Today();
console.log(today);

var Week = Backbone.Model.extend({
	name: "This Week",
	date: "July 24, 2014",
	spent: 16,
	budget: 50,
	profit: budget - spent,
});
var week = new Week();

var Month = Backbone.Model.extend({
	name: "This Month",
	date: "July 24, 2014",
	spent: 16,
	budget: 50,
	profit: budget - spent,
});
var month = new Month();

// Initialize
var todayView = new TodayView({
	model: today
});
var weekView = new WeekView({
	model: week
});
var monthView = new MonthView({
	model: month
});

App.today.show(todayView);
App.week.show(weekView);
App.month.show(monthView);