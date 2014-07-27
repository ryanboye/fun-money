var App = new Marionette.Application();

App.addRegions({
    "today": "#today",
    "week": "#week",
    "month": "#month",
    "year": "#year"
});

var TodayView = Marionette.ItemView.extend({
    className: 'view',
    template: "#todayView"
});

var PeriodView = Marionette.ItemView.extend({
    className: 'view',
    template: "#periodView"
});

var TimePeriod = Backbone.Model.extend({
    name: "Period",
    date: moment().format('MMMM Do YYYY'),
    spent: 100,
    budget: 100,
    status: "neutral",
    profit: 0
});

var day = new TimePeriod();
var week = new TimePeriod();
var month = new TimePeriod();
var year = new TimePeriod();

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
        profit: Math.round(period.budget - period.spent)
    };
};

var update = function (data, targetdate) {

    var targetdate = moment();
    var stats = MINT.stats(data, targetdate);

    day.set(dataForPeriod(stats.day, targetdate.format('MMMM Do YYYY')));
    week.set(dataForPeriod(stats.week, "This Week"));
    month.set(dataForPeriod(stats.month, "This Month"));
    year.set(dataForPeriod(stats.year, "This Year"));
};


var onload = function () {
    var data = MINT.loadData();

    if (data) {
        update(data, moment());
    }
};

onload();
App.today.show(todayView);
App.week.show(weekView);
App.month.show(monthView);
App.year.show(yearView);
