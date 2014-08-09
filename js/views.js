TodayView = Marionette.ItemView.extend({
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

PeriodView = Marionette.ItemView.extend({
	className: 'view',
	template: "#periodView",
	modelEvents: {
		'change': 'fieldsChanged'
	},
	fieldsChanged: function () {
		this.render();
		if (this.d3Selection !== null) {
			MONEY.updatePeriodView(this.model, this.d3Selection);
		}
	},
	d3Selection: null,
	onRender: function () {
		if (this.d3Selection === null) {
			var graphdiv = this.$el.find(".graph");
			MONEY.createPeriodView(graphdiv, this.model, this.d3Selection);
		}
	}
});
