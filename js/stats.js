var STATS = (function () {
    'use strict';
    var STATS = {};

    STATS.parse = function (file, cb) {
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: function (results) {
                localStorage.mintData = JSON.stringify(results.data);
                cb();
            }
        });
    };

    STATS.loadData = function () {
        if (localStorage.mintData) {
            var data = JSON.parse(localStorage.mintData);
            for (var i = 0; i < data.length; i++) {
                data[i].Date = moment(data[i].Date);
            }
            return data;

        } else return [];
    };

    var processTransaction = function (transaction, period) {
        if (transaction["Transaction Type"] === "debit") {
            period.spent = period.spent + transaction.Amount;
            period.transactions.push(transaction);

        }
    };

    var daysInMonth = function (month, year) {
        return new Date(year, month, 0).getDate();
    }

    STATS.get = function (data, targetdate, targetbudget) {
        var salary = targetbudget;
        var dailyBudget = salary / 365;

        var stats = {
            day: {},
            week: {},
            month: {},
            year: {}
        };

        stats.day.budget = dailyBudget;
        stats.week.budget = dailyBudget * 7;
        stats.month.budget = dailyBudget * daysInMonth(targetdate.get('month'), targetdate.get('year'));
        stats.year.budget = dailyBudget * 365;

        stats.day.spent = 0;
        stats.week.spent = 0;
        stats.month.spent = 0;
        stats.year.spent = 0;

        stats.day.transactions = [];
        stats.week.transactions = [];
        stats.month.transactions = [];
        stats.year.transactions = [];

        stats.day.beginPeriod = targetdate;
        stats.week.beginPeriod = moment(targetdate).startOf('week');
        stats.month.beginPeriod = moment(targetdate).startOf('month');
        stats.year.beginPeriod = moment(targetdate).startOf('year');

        stats.day.endPeriod = targetdate;
        stats.week.endPeriod = moment(targetdate).endOf('week');
        stats.month.endPeriod = moment(targetdate).endOf('month');
        stats.year.endPeriod = moment(targetdate).endOf('year');

        for (var i = 0; i < data.length; i++) {
            var transaction = data[i];
            var date = transaction.Date;

            if (date) {

                if (date.isSame(targetdate, 'year')) {
                    processTransaction(transaction, stats.year);
                }
                if (date.isSame(targetdate, 'month')) {
                    processTransaction(transaction, stats.month);
                }
                if (date.isSame(targetdate, 'week')) {
                    processTransaction(transaction, stats.week);
                }
                if (date.isSame(targetdate, 'day')) {
                    processTransaction(transaction, stats.day);
                }
            }

        }
        return stats;

    };

    return STATS;
}());
