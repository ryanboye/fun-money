var MONEY = (function (module) {
	'use strict';
	var StatProvider = {};

	module.GetStatProvider = function () {
		var provider = Object.create(StatProvider);
		provider.dataStore = {};
		provider.loadData();
		return provider;
	};

	StatProvider.parse = function (file) {
		var cb = this.loadData();
		Papa.parse(file, {
			header: true,
			dynamicTyping: true,
			complete: function (results) {
				localStorage.mintData = JSON.stringify(results.data);
				cb();
			}
		});
	};

	StatProvider.loadData = function () {
		if (localStorage.mintData) {
			var data = JSON.parse(localStorage.mintData);
			for (var i = 0; i < data.length; i++) {
				data[i].Date = moment(data[i].Date);
				var year = data[i].Date.year();
				if (!this.dataStore[year]) {
					this.dataStore[year] = [];
				}
				this.dataStore[year].push(data[i]);
			}
		};
	};

	StatProvider._processTransaction = function (transaction, period) {
		if (transaction["Transaction Type"] === "debit") {
			period.spent = period.spent + transaction.Amount;
			period.transactions.push(transaction);
		}
	};

	StatProvider._daysInMonth = function (month, year) {
		return new Date(year, month, 0).getDate();
	};

	StatProvider.get = function (targetdate, targetbudget) {
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
		stats.month.budget = dailyBudget * this._daysInMonth(targetdate.get('month'), targetdate.get('year'));
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

		var yearNum = targetdate.year();
		var data = this.dataStore[yearNum];
		if (!data) data = [];
		for (var i = 0; i < data.length; i++) {
			var transaction = data[i];
			var date = transaction.Date;

			if (date) {

				if (date.isSame(targetdate, 'year')) {
					this._processTransaction(transaction, stats.year);
				}
				if (date.isSame(targetdate, 'month')) {
					this._processTransaction(transaction, stats.month);
				}
				if (date.isSame(targetdate, 'week')) {
					this._processTransaction(transaction, stats.week);
				}
				if (date.isSame(targetdate, 'day')) {
					this._processTransaction(transaction, stats.day);
				}
			}

		}
		return stats;

	};

	module.StatProvider = StatProvider;

	return module;
}(MONEY || {}));
