function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = jQuery.trim(cookies[i]);
			if (cookie.substring(0, name.length + 1) == (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}
var csrftoken = getCookie('csrftoken');

/* <---IS STUDENT Check BOX ------>*/
var checkbox = document.getElementById("register-isStudent-rw");

checkbox.addEventListener("change", function () {
	if (this.checked) {
		console.log("Checkbox is checked..");

		document.getElementById("register-college-rw").style.display = "block";
		document.getElementById("register-profession-rw").value = "STUDENT";
		document.getElementById("register-profession-rw").disabled = true;

	} else {
		console.log("Checkbox is not checked..");

		document.getElementById("register-college-rw").style.display = "none";
		document.getElementById("register-profession-rw").value = "";
		document.getElementById("register-profession-rw").disabled = false;

	}
});
var checkbox = document.getElementById("register-isStudent-pp");

checkbox.addEventListener("change", function () {
	if (this.checked) {
		console.log("Checkbox is checked..");

		document.getElementById("register-college-pp").style.display = "block";
		document.getElementById("register-profession-pp").value = "STUDENT";
		document.getElementById("register-profession-pp").disabled = true;

	} else {
		console.log("Checkbox is not checked..");

		document.getElementById("register-college-pp").style.display = "none";
		document.getElementById("register-profession-pp").value = "";
		document.getElementById("register-profession-pp").disabled = false;

	}
});
var checkbox = document.getElementById("register-isStudent-mr");

checkbox.addEventListener("change", function () {
	if (this.checked) {
		console.log("Checkbox is checked..");

		document.getElementById("register-college-mr").style.display = "block";
		document.getElementById("register-profession-mr").value = "STUDENT";
		document.getElementById("register-profession-mr").disabled = true;

	} else {
		console.log("Checkbox is not checked..");

		document.getElementById("register-college-mr").style.display = "none";
		document.getElementById("register-profession-mr").value = "";
		document.getElementById("register-profession-mr").disabled = false;

	}
});
/* <----------------------------------------------------------------> */
/* <---------------Country Dropdown-------------------------------> */
// var tempcountry = document.getElementById("register-country-pp");
// var tempstate = document.getElementById("register-state-pp");
// tempcountry.addEventListener("change", function () {
// 	if (tempcountry.value != "India") {
// 		tempstate.disabled = true;
// 		tempstate.value = "Not Applicable";
// 		tempstate.selected = "Not Applicable";
// 	}
// 	else {
// 		tempstate.disabled = false;
// 		tempstate.value = "";
// 		tempstate.selected = "Select";
// 	}
// })
/* <----------------------------------------------------------------> */
$.ajaxSetup({
	beforeSend: function (xhr, settings) {
		if (csrftoken) {
			xhr.setRequestHeader("X-CSRFToken", csrftoken);
		}
	}
});

var active_content = "home-content";
var next_content;
var transition_time = 500;
var isRegisterOpen = 0;
var registerContent;

for (var i = 0; i < document.getElementsByClassName("event-link").length; i++) {
	document.getElementsByClassName("event-link")[i].addEventListener("click", openEvent);
}
for (var i = 0; i < document.getElementsByClassName("top-menu-items").length; i++) {
	document.getElementsByClassName("top-menu-items")[i].addEventListener("click", openEvent);
}

function openEvent() {
	document.getElementById('nav-top').style.color = '#fff';
	document.getElementsByClassName('top-bar')[0].style.background = '#fff';
	document.getElementsByClassName('social-icons')[0].style.filter = 'grayscale(0) invert(0)';

	fadeOut(active_content);
	document.getElementById("register-bottom").style.height = "10%";
	if (this.id != "home" && this.id != "contact") {
		registerContent = "register-content-" + this.id;
		document.getElementById(registerContent).style.opacity = 0;
	}
	next_content = this.id + "-content";
	if (next_content == "home-content" || next_content == "contact-content") {
		if (!isRegisterOpen)
			fadeOutRegister();
		else {
			isRegisterOpen = !isRegisterOpen;
			setTimeout(function () { fadeOutRegister(); }, 500);
		}
		setTimeout(function () { fadeIn("nav-bottom"); }, transition_time);
	}
	else {
		fadeOut("nav-bottom");
		setTimeout(function () { fadeInRegister(id); }, transition_time);
	}
	id = this.id;
	setTimeout(
		function () { fadeIn(next_content); active_content = next_content; document.getElementById(registerContent).style.display = "none"; },
		transition_time);
}
function fadeOut(id) {
	document.getElementById(id).style.opacity = 0;
	setTimeout(
		function () { document.getElementById(id).style.display = "none"; },
		transition_time);
}
function fadeIn(id) {
	document.getElementById(id).style.display = "flex";
	setTimeout(
		function () { document.getElementById(id).style.opacity = 1; },
		100);
}
function fadeInRegister(id) {
	/* if (id == "rapwars") {
			document.getElementById("register-bottom").innerHTML = '<span id="" style="cursor: default" class="register-for">Registrations closed for Rapwars</span>';
			document.getElementById("register-bottom").style.display = "flex";
			setTimeout(function(){
				document.getElementById("register-bottom").style.opacity = 1;
			}, 100);
	} */
	if (id == "standup") {
		document.getElementById("register-bottom").innerHTML = '<span id="" style="cursor: default" class="register-for">Registrations will open soon.</span>';
		document.getElementById("register-bottom").style.display = "flex";
		setTimeout(function () {
			document.getElementById("register-bottom").style.opacity = 1;
		}, 100);
	}
	else if (id == "rapwars") {
		document.getElementById("register-bottom").innerHTML = '<span id="' + id + '-register" style="cursor: pointer" class="register-for">PreRegister</span>';
		document.getElementById("register-bottom").style.display = "flex";
		setTimeout(function () {
			document.getElementById("register-bottom").style.opacity = 1;
			if (!document.getElementById(id + "-register").classList.contains("reg-closed")) {
				document.getElementById(id + "-register").addEventListener("click", function () { register(id); });
			}
		}, 100);
	}
	else if (id == "mirage") {
		document.getElementById("register-bottom").innerHTML = '<span id="" style="cursor: default" class="register-for"><br>Registrations for Mirage have been put on hold for a few days due to postponement of the event. In case of any queries, contact Isha at +91 8573960061.<br><br></span>';
		document.getElementById("register-bottom").style.display = "flex";
		setTimeout(function () {
			document.getElementById("register-bottom").style.opacity = 1;
		}, 100);
	}
	// else if (id == "rapwars") {
	// 	document.getElementById("register-bottom").innerHTML = '<span id="" style="cursor: default" class="register-for">Registrations will open soon.</span>';
	// }
	//  else {
	// 	document.getElementById("register-bottom").innerHTML = '<span id="" style="cursor: default" class="register-for">Registrations closed for ' + id + '</span>';
	// }
	else {
		document.getElementById("register-bottom").innerHTML = '<span id="' + id + '-register" style="cursor: pointer" class="register-for">PreRegister</span>';

		document.getElementById("register-bottom").style.display = "flex";
		setTimeout(function () {
			document.getElementById("register-bottom").style.opacity = 1;
			if (!document.getElementById(id + "-register").classList.contains("reg-closed")) {
				document.getElementById(id + "-register").addEventListener("click", function () { register(id); });
			}
		}, 100);
	}
}
function fadeOutRegister() {
	document.getElementById("register-bottom").style.opacity = 0;
	setTimeout(
		function () { document.getElementById("register-bottom").style.display = "none"; },
		transition_time);
}
function register(id) {
	setTimeout(function () {
		document.getElementById('nav-top').style.color = '#000';
		document.getElementsByClassName('top-bar')[0].style.background = '#000';
		document.getElementsByClassName('social-icons')[0].style.filter = 'grayscale(1) invert(1)';
	}, 500);

	isRegisterOpen = !isRegisterOpen;
	document.getElementById("register-bottom").style.height = "100%";
	document.getElementById(id + "-content").style.opacity = 0;
	setTimeout(
		function () { document.getElementById(id + "-content").style.display = "none"; },
		transition_time);
	document.getElementById(id + "-register").style.opacity = 0;
	for (i = 0; i < document.getElementsByClassName("register-for-head").length; i++) {
		if (id == "standup") {
			document.getElementsByClassName("register-for-head")[i].innerHTML = "Register for standup soapbox";
		} else if (id == "purpleprose") {
			document.getElementsByClassName("register-for-head")[i].innerHTML = "Register for Purple Prose";
		}
		else {
			document.getElementsByClassName("register-for-head")[i].innerHTML = "Register for " + id;
		}
	}
	setTimeout(function () {
		document.getElementById(id + "-register").style.display = "none";
		document.getElementById(registerContent).style.display = "flex";
		document.getElementById(registerContent).style.opacity = 1;
	},
		transition_time);
}

// Register
document.getElementById("register-close").addEventListener("click", closeRegister);
function closeRegister(e) {
	document.getElementById("register-overlay").style.display = "none";
	document.getElementById("register-message").style.display = "none";
	e.preventDefault();
}

function closeRegister(f) {
	document.getElementById("register-overlay").style.display = "none";
	document.getElementById("register-message").style.display = "none";
	f.preventDefault();
}

function closeRegister(g) {
	document.getElementById("register-overlay").style.display = "none";
	document.getElementById("register-message").style.display = "none";
	g.preventDefault();
}

function closeRegister(h) {
	document.getElementById("register-overlay").style.display = "none";
	document.getElementById("register-message").style.display = "none";
	h.preventDefault();
}
function closeRegister(i) {
	document.getElementById("register-overlay").style.display = "none";
	document.getElementById("register-message").style.display = "none";
	i.preventDefault();
}

function changeRoctavesForm(tabID) {
	if (tabID == "online-form-tab") {
		document.getElementById('myFormRocktavesOffline').style.opacity = 0;
		setTimeout(function () {
			document.getElementById('myFormRocktavesOffline').style.display = "none";
			document.getElementById('myFormRocktavesOnline').style.display = "initial";
			setTimeout(function () {
				document.getElementById('myFormRocktavesOnline').style.opacity = 1;
				document.getElementById('online-form-tab').style.textDecoration = "underline";
			}, 10);
		}, transition_time);
		document.getElementById('offline-form-tab').style.textDecoration = "none";
	} else {
		/* document.getElementById('myFormRocktavesOnline').style.opacity = 0;
		setTimeout(function() {
			document.getElementById('myFormRocktavesOnline').style.display = "none";
			document.getElementById('myFormRocktavesOffline').style.display = "block";
			setTimeout(function() {
				document.getElementById('myFormRocktavesOffline').style.opacity = 1;
				document.getElementById('offline-form-tab').style.textDecoration = "underline";
			}, 10);
		}, transition_time);
		document.getElementById('online-form-tab').style.textDecoration = "none"; */
		alert("Sorry! the offline registration have been closed");
	}
}




//----------------------------------------ajax request---------------------------------------

document.getElementById("myFormRocktavesOnline").onsubmit = function registerForm(e) {
	e.preventDefault();
	name = document.getElementById("register-name-ro").value;
	genre = document.getElementById("register-genre-ro").value;
	contact1 = document.getElementById("register-contact-ro-1").value;
	contact2 = document.getElementById("register-contact-ro-2").value;
	email = document.getElementById("register-email-ro").value;
	members = document.getElementById("register-members-ro").value;
	state = document.getElementById('register-region-ro').value;
	region = document.getElementById("register-region-ro")[document.getElementById("register-region-ro").selectedIndex].parentNode.getAttribute('value');
	city = document.getElementById("register-city-ro").value;
	entry1 = document.getElementById("register-entry1-ro").value;
	entry2 = document.getElementById("register-entry2-ro").value;
	entries = document.getElementById("register-entries-ro").value;
	if (name != "" && genre != "" && contact1 != "" && contact2 != "" && email != "" && members != "" && region != "" && state != "" && city != "" && entry1 != "" && entry2 != "") {
		URL = "https://bits-oasis.org/pre-registrations/RoctavesOnlineReg/";
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			crossDomain: true,
			// headers: { 'x-my-custom-header': 'some value' },
			url: URL,
			data: JSON.stringify({
				name: name,
				genre: genre,
				phone1: contact1,
				phone2: contact2,
				email_address: email,
				number_of_members: members,
				region: region,
				state: state,
				city: city,
				entry1: entry1,
				entry2: entry2,
				enteries: entries
			}),
			dataType: "json",
			error: function (xhr, textstatus, err) {
				document.getElementById("register-overlay").style.display = "flex";
				document.getElementById("register-message").style.display = "flex";
				document.getElementById("register-message-span").innerHTML = "ERROR! Please try again.<br>Try registering in <i>incognito mode</i>.<br>If the problem persists, please try registering through a different browser or device.";
			}
		}).done(function (response) {
			document.getElementById("register-overlay").style.display = "flex";
			document.getElementById("register-message").style.display = "flex";
			document.getElementById("register-message-span").innerHTML = response.message;
		});
	}
	else {
		document.getElementById("register-overlay").style.display = "flex";
		document.getElementById("register-message-span").innerHTML = "Please fill all the required fields.";
		document.getElementById("register-message").style.display = "flex";
	}
}

document.getElementById("myFormRocktavesOffline").onsubmit = function registerForm(e) {
	name = document.getElementById("off-register-name-ro").value;
	genre = document.getElementById("off-register-genre-ro").value;
	contact1 = document.getElementById("off-register-contact-ro-1").value;
	contact2 = document.getElementById("off-register-contact-ro-2").value;
	email = document.getElementById("off-register-email-ro").value;
	members = document.getElementById("off-register-members-ro").value;
	elemLocation = document.getElementById("off-register-location-ro").value;
	if (name != "" && genre != "" && contact1 != "" && contact2 != "" && email != "" && members != "" && elemLocation != "") {
		URL = "https://bits-oasis.org/pre-registrations/RoctavesOfflineReg/";
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			crossDomain: true,
			// headers: { 'x-my-custom-header': 'some value' },
			url: URL,
			data: JSON.stringify({
				name: name,
				genre: genre,
				phone1: contact1,
				phone2: contact2,
				email_address: email,
				number_of_members: members,
				city: elemLocation
			}),
			dataType: "json",
			error: function (xhr, textstatus, err) {
				document.getElementById("register-overlay").style.display = "flex";
				document.getElementById("register-message").style.display = "flex";
				document.getElementById("register-message-span").innerHTML = "ERROR! Please try again.<br>Try registering in <i>incognito mode</i>.<br>If the problem persists, please try registering through a different browser or device.";
			}
		}).done(function (response) {
			document.getElementById("register-overlay").style.display = "flex";
			document.getElementById("register-message").style.display = "flex";
			document.getElementById("register-message-span").innerHTML = response.message;
		});
	}
	else {
		document.getElementById("register-overlay").style.display = "flex";
		document.getElementById("register-message-span").innerHTML = "Please fill all the required fields.";
		document.getElementById("register-message").style.display = "flex";
	}
	e.preventDefault();
}

document.getElementById("myFormRapwars").onsubmit = function registerForm(f) {
	name = document.getElementById("register-name-rw").value;
	rapname = document.getElementById("register-rapname-rw").value;
	state = document.getElementById("register-state-rw").value;
	city = document.getElementById("register-city-rw").value;
	organisation = document.getElementById("register-organisation-rw").value;
	college = document.getElementById("register-college-rw").value;
	socials = document.getElementById("register-socials-rw").value;
	previous_performances = document.getElementById(
		"register-pre-performance-rw"
	).value;
	contact = document.getElementById("register-contact-rw").value;
	email = document.getElementById("register-email-rw").value;
	isStudent = document.getElementById("register-isStudent-rw").checked;
	if (
		name != "" &&
		state != "" &&
		city != "" &&
		// organisation != "" &&
		previous_performances != "" &&
		contact != "" &&
		email != ""
	) {
		URL = "https://bits-oasis.org/pre-registrations/RapWarsRegistration/";
		$.ajax({
			type: "POST",
			contentType: "application/json",
			crossDomain: true,
			// headers: { 'x-my-custom-header': 'some value' },
			url: URL,
			data: JSON.stringify({
				name: name,
				rapname: rapname,
				state: state,
				city: city,
				isStudent: isStudent,
				organisation: organisation,
				college: college,
				previous_performances: previous_performances,
				socials: socials,
				phone: contact,
				email_address: email,
			}),
			dataType: "json",
			error: function (xhr, textstatus, err) {
				document.getElementById("register-overlay").style.display = "flex";
				document.getElementById("register-message").style.display = "flex";
				document.getElementById("register-message-span").innerHTML =
					"ERROR! Please try again.<br>Try registering in <i>incognito mode</i>.<br>If the problem persists, please try registering through a different browser or device.";
			},
		}).done(function (response) {
			document.getElementById("register-overlay").style.display = "flex";
			document.getElementById("register-message").style.display = "flex";
			document.getElementById("register-message-span").innerHTML =
				response.message;
		});
	} else {
		document.getElementById("register-overlay").style.display = "flex";
		document.getElementById("register-message-span").innerHTML =
			"Please fill all the required fields.";
		document.getElementById("register-message").style.display = "flex";
	}
	f.preventDefault();
}

document.getElementById("myFormPurpleprose").onsubmit = function registerForm(g) {
	name = document.getElementById("register-name-pp").value;
	language = document.getElementById("register-language-pp").value;
	state = document.getElementById("register-state-pp").value;
	city = document.getElementById("register-city-pp").value;
	// country = document.getElementById("register-country-pp").value;
	organisation = document.getElementById("register-organisation-pp").value;
	college = document.getElementById("register-college-pp").value;
	previous_performances = document.getElementById(
		"register-pre-performance-pp"
	).value;
	contact = document.getElementById("register-contact-pp").value;
	email = document.getElementById("register-email-pp").value;
	isStudent = document.getElementById("register-isStudent-pp").checked;
	if (
		name != "" &&
		state != "" &&
		city != "" &&
		// organisation != "" &&
		previous_performances != "" &&
		contact != "" &&
		email != ""
	) {
		URL = "https://bits-oasis.org/pre-registrations/PurpleProseRegistration/";
		``;
		$.ajax({
			type: "POST",
			contentType: "application/json",
			crossDomain: true,
			// headers: { 'x-my-custom-header': 'some value' },
			url: URL,
			data: JSON.stringify({
				name: name,
				language_of_poetry: language,
				state: state,
				city: city,
				// country: country,
				isStudent: isStudent,
				organisation: organisation,
				college: college,
				previous_performances: previous_performances,
				phone: contact,
				email_address: email,
			}),
			dataType: "json",
			error: function (xhr, textstatus, err) {
				document.getElementById("register-overlay").style.display = "flex";
				document.getElementById("register-message").style.display = "flex";
				document.getElementById("register-message-span").innerHTML =
					"ERROR! Please try again.<br>Try registering in <i>incognito mode</i>.<br>If the problem persists, please try registering through a different browser or device.";
			},
		}).done(function (response) {
			document.getElementById("register-overlay").style.display = "flex";
			document.getElementById("register-message").style.display = "flex";
			document.getElementById("register-message-span").innerHTML =
				response.message;
			console.log(response);
		});
	} else {
		document.getElementById("register-overlay").style.display = "flex";
		document.getElementById("register-message-span").innerHTML =
			"Please fill all the required fields.";
		document.getElementById("register-message").style.display = "flex";
	}
	g.preventDefault();
}
document.getElementById("myFormStandup").onsubmit = function registerForm(h) {
	name = document.getElementById("register-name-ss").value;
	contact = document.getElementById("register-contact-ss").value;
	email = document.getElementById("register-email-ss").value;
	months = document.getElementById("register-months-ss").value;
	previous_competition = document.getElementById("register-pre-comp-ss").value;
	city = document.getElementById("register-city-ss").value;
	citypref = document.getElementById("register-location-ss").value;
	if (name != "" && contact != "" && email != "" && months != "" && previous_competition != "" && city != "" && citypref != "") {
		URL = "https://bits-oasis.org/pre-registrations/StandupSoapboxRegistration/";
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			crossDomain: true,
			// headers: { 'x-my-custom-header': 'some value' },
			url: URL,
			data: JSON.stringify({
				name: name,
				phone: contact,
				email_address: email,
				time_doing_standup: months,
				previous_competition: previous_competition,
				city_of_participation: citypref,
				city: city
			}),
			dataType: "json",
			error: function (xhr, textstatus, err) {
				document.getElementById("register-overlay").style.display = "flex";
				document.getElementById("register-message").style.display = "flex";
				document.getElementById("register-message-span").innerHTML = "ERROR! Please try again.<br>Try registering in <i>incognito mode</i>.<br>If the problem persists, please try registering through a different browser or device.";
			}
		}).done(function (response) {
			document.getElementById("register-overlay").style.display = "flex";
			document.getElementById("register-message").style.display = "flex";
			document.getElementById("register-message-span").innerHTML = response.message;
		});
	}
	else {
		document.getElementById("register-overlay").style.display = "flex";
		document.getElementById("register-message-span").innerHTML = "Please fill all the required fields.";
		document.getElementById("register-message").style.display = "flex";
	}
	h.preventDefault();
}
/* <---------------MIRAGE FORM-----------------> */
document.getElementById("myFormMirage").onsubmit = function registerForm(h) {
	name = document.getElementById("register-name-mr").value;
	language = document.getElementById("register-language-mr").value;
	state = document.getElementById("register-state-mr").value;
	city = document.getElementById("register-city-mr").value;
	profession = document.getElementById("register-profession-mr").value;
	college = document.getElementById("register-college-mr").value;
	previous_performances = document.getElementById("register-pre-performance-mr").value;
	contact = document.getElementById("register-contact-mr").value;
	email = document.getElementById("register-email-mr").value;
	isStudent = document.getElementById("register-isStudent-mr").checked;
	if (
		name != "" &&
		state != "" &&
		city != "" &&
		profession != "" &&
		previous_performances != "" &&
		contact != "" &&
		email != ""
	) {
		URL = "https://bits-oasis.org/pre-registrations/MirageRegistration/"; ``
		$.ajax({
			type: "POST",
			contentType: "application/json",
			crossDomain: true,
			// headers: { 'x-my-custom-header': 'some value' },
			url: URL,
			data: JSON.stringify({
				name: name,
				language_of_poetry: language,
				state: state,
				city: city,
				isStudent: isStudent,
				profession: profession,
				college: college,
				previous_performances: previous_performances,
				phone: contact,
				email_address: email,
			}),
			dataType: "json",
			error: function (xhr, textstatus, err) {
				document.getElementById("register-overlay").style.display = "flex";
				document.getElementById("register-message").style.display = "flex";
				document.getElementById("register-message-span").innerHTML =
					"ERROR! Please try again.<br>Try registering in <i>incognito mode</i>.<br>If the problem persists, please try registering through a different browser or device.";
			},
		}).done(function (response) {
			document.getElementById("register-overlay").style.display = "flex";
			document.getElementById("register-message").style.display = "flex";
			document.getElementById("register-message-span").innerHTML =
				response.message;
			console.log(response);
		});
	} else {
		document.getElementById("register-overlay").style.display = "flex";
		document.getElementById("register-message-span").innerHTML =
			"Please fill all the required fields.";
		document.getElementById("register-message").style.display = "flex";
	}
	h.preventDefault();
}
