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

// Initialize

var todayView = new TodayView({
	model: today;
});

var weekView = new WeekView({
	model: week;
});

var monthView = new MonthView({
	model: month;
});

App.today.show(todayView);
App.week.show(weekView);
App.month.show(monthView);