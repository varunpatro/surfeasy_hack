
// Initialization of variables
var text = ""; // text is where all the email address will be stored

function helper (counter) {
	if (counter < 1) {
		return;
	}
	var state_out = false;
	var state_in = false;
	chrome.cookies.remove({"url": "http://www.guerrillamail.com", "name": "PHPSESSID"});

	var url = "";
	var gm = new XMLHttpRequest();
	gm.open("GET", "https://www.guerrillamail.com/");


	gm.onreadystatechange = function () {
		if (state_out) {
			return;
		}
		var doc = document.implementation.createHTMLDocument("example");
		doc.documentElement.innerHTML = gm.responseText;
		url = (doc.getElementById('email-widget').innerHTML);
		console.log("GET " + url);
		var surf = new XMLHttpRequest();
		surf.open("POST", "http://accounts.surfeasy.com/register_referral");
		surf.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		surf.onreadystatechange = function () {
			if (state_in) {
				return;
			}
			console.log("POST " + url);
			text += url + "\n";
			state_in = true;
			helper(counter);

		};
		surf.send("locale=en&http_referer=&name=&email=" + encodeURIComponent(url) + "&password=1234&password_confirmation=1234&accepted_terms=on&token=ALU6MHFL4N&referring_subscriber_id=6073872");
		state_out = true;
	}

	gm.send();

	counter = counter - 1;
}
