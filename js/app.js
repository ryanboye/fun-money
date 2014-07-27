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