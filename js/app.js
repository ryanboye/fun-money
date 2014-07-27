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
	date: "July 24 2014",
	spent: 16,
	budget: 50,
	status:"positive",
	profit: 50-16,
});
var today = new Today();


var Week = Backbone.Model.extend({
	name: "This Week",
	date: "July 24 2014",
	spent: 16,
	budget: 50,
	status:"positive",
	profit: 50-16,
});
var week = new Week();

var Month = Backbone.Model.extend({
	name: "This Month",
	date: "July 24 2014",
	spent: 16,
	budget: 50,
	status:"positive",
	profit: 50-16,
});
var month = new Month();

// Initialize
var todayView = new TodayView({
	model: today
});
var weekView = new PeriodView({
	model: week
});
var monthView = new PeriodView({
	model: month
});

App.today.show(todayView);
App.week.show(weekView);
App.month.show(monthView);