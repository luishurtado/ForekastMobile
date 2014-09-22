var StyledLabel = require("ti.styledlabel");

var label = StyledLabel.createLabel({
	height: Ti.UI.SIZE,
	top: 0,
	right: 20,
	bottom: 20,
	left: 20,
	html: "<style type='text/css'>body {font-family: 'HelveticaNeue-Thin', 'Helvetica Neue Thin', 'HelveticaNeue', Helvetica, Arial, sans-serif;font-size: 14px;color: #3E4252;}a {color: #3CA395; text-decoration: none;}p {margin: 20px 0 0;}</style><p>This application developed and designed by <a href='http://www.mattcongrove.com'><strong>Matthew Congrove</strong></a>. Contributions provided by Chris Bowley.</p><p>This application is <strong>not</strong> owned or maintained by Forekast.</p><p>Forekast, the astronaut logo, and data used with permission of Forekast, Inc.</p><p>This application stores anonymized credentials to interact with the Forekast service. Your username, e-mail address, password and other identifiable information is <strong>not</strong> stored. Anonymized usage data is tracked for the purpose of analytics, specifically to improve this application and monitor performance, and is stored by a secure 3rd-party analytics service. The analytics data may be shared with Forekast, but no other 3rd-party without prior notice. This application will request and attempt to use location data to improve the service, specifically for localizing the time of events to your current timezone. There is no advertising in this application, and we do not share your personal information with any advertising companies.</p><p>The above information is subject to change. If any material changes are made, we will provide a prominent notice in this application or our app store listings.</p>"
});

label.addEventListener("click", function(_event) {
	if(_event.url) {
		Ti.Platform.openURL(_event.url);
	}
});

$.ScrollView.add(label);