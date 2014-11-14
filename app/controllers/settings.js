// App bootstrap
var App = require("core");

/*
	// TODO: v1.2
	{
		title: "Sign out",
		action: function() {
			
		}
	},
	{
		title: "Event reminder settings",
		action: function() {
			var picker = Alloy.createController("ui/picker");
			var selectedValue = Ti.App.Properties.getInt("ReminderDefault", 0);
			
			var options = [
				{
					title: "15 min. before",
					value: 0,
					selected: selectedValue == 0 ? true : false
				},
				{
					title: "1 hr. before",
					value: 1,
					selected: selectedValue == 1 ? true : false
				},
				{
					title: "4 hr. before",
					value: 2,
					selected: selectedValue == 2 ? true : false
				},
				{
					title: "1 day before",
					value: 3,
					selected: selectedValue == 3 ? true : false
				}
			];
			
			picker.setOptions(options);
			picker.setInstructions("Choose a default time for any new reminders you create");
			
			picker.setCallback(function(_data) {
				if(_data !== false) {
					Ti.App.Properties.setInt("ReminderDefault", _data);
				}
				
				$.SettingsWindow.remove(picker.getView());
			});
			
			$.SettingsWindow.add(picker.getView());
			
			picker.open();
		}
	},
*/

var OPTIONS = [];

OPTIONS.push({
	title: "Cancel all event reminders",
	action: function() {
		var reminder = require("reminder");

		reminder.cancelAllReminders();

		var dialog = Ti.UI.createAlertDialog({
			title: "Reminders Canceled",
			message: "All event reminders have been canceled",
			ok: "OK"
		});

		dialog.show();
	}
});

OPTIONS.push({
	title: "Frequently asked questions",
	controller: "settings/faq"
});

OPTIONS.push({
	title: "About this app",
	controller: "settings/about"
});

OPTIONS.push({
	title: "Send us feedback",
	controller: "settings/feedback"
});

OPTIONS.push({
	title: "Send us love",
	action: function() {
		var dialog = Ti.UI.createAlertDialog({
			title: "Rate Forekast",
			message: "If you enjoy using Forekast, would you mind taking a moment to rate it? It won't take more than a minute. Thanks for your support!",
			buttonNames: [
				"Not Now",
				"Rate Forekast"
			],
			cancel: 0
		});

		dialog.addEventListener("click", function(_event) {
			if(_event.index == 1) {
				var url = Alloy.CFG.Rating.URL + Alloy.CFG.Rating.AppId;

				Ti.Platform.openURL(url);
			}
		});

		dialog.show();
	}
});

function init() {
	var rows = [];

	for(var i = 0, x = OPTIONS.length; i < x; i++) {
		var row = Alloy.createController("ui/settings_row", {
			title: OPTIONS[i].title
		}).getView();

		if(i % 2 == 0) {
			row.backgroundColor = "#FFF";
		}

		if(OPTIONS[i].controller) {
			row.controller = OPTIONS[i].controller;

			row.addEventListener("click", function(_event) {
				var detail = Alloy.createController(_event.row.controller).getView();

				if(OS_IOS) {
					if(Alloy.isTablet) {
						App.MasterWindow.openWindow(detail);
					} else {
						$.NavWindow.openWindow(detail);
					}
				} else {
					detail.open();
				}
			});
		} else if(OPTIONS[i].action) {
			row.addEventListener("click", OPTIONS[i].action);

			row.remove(row.children[1]);
		}

		rows.push(row);
	}

	$.Table.setData(rows);
}

function closeSettings() {
	if(OS_IOS) {
		$.NavWindow.close();
	} else {
		$.SettingsWindow.close();
	}
}

init();