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

var data = MINT.loadData();
var targetdate = moment();
var stats = MINT.stats(data, targetdate);

var Today = Backbone.Model.extend({
    name: "Today",
    date: targetdate.format('MMMM Do YYYY'),
    spent: stats.day.spent,
    budget: stats.day.budget,
    status: stats.day.budget - stats.day.spent > 0 ? "positive" : "negative",
    profit: stats.day.budget - stats.day.spent
});
var today = new Today();


var Week = Backbone.Model.extend({
    name: "This Week",
    date: targetdate.format('MMMM Do YYYY'),
    spent: stats.day.spent,
    budget: stats.day.budget,
    status: stats.day.budget - stats.day.spent > 0 ? "positive" : "negative",
    profit: stats.day.budget - stats.day.spent
});
var week = new Week();

var Month = Backbone.Model.extend({
    name: "This Month",
    date: targetdate.format('MMMM Do YYYY'),
    spent: stats.day.spent,
    budget: stats.day.budget,
    status: stats.day.budget - stats.day.spent > 0 ? "positive" : "negative",
    profit: stats.day.budget - stats.day.spent
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
