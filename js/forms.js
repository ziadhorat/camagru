function	login_validate() {

	var msg = document.getElementById("login_msg");
	var login_elem = document.getElementById("login");
	var login = login_elem.value.trim();
	var passwd_elem = document.getElementById("passwd");
	var passwd = passwd_elem.value.trim();
	var xhr = new XMLHttpRequest();

	reset_msgs();
	if (login === "" || passwd === "") {
		msg.style.display = "block";
		msg.innerHTML = "Please fill all fields.<br/>";
	}
	else if (login_elem.validity.RangeUnderflow || login_elem.validity.RangeOverflow ||
	((/^[a-zA-Z0-9_-]{5,20}$/).test(login) == false) || passwd_elem.validity.RangeUnderflow ||
	passwd_elem.validity.RangeOverflow || ((/^[a-zA-Z0-9!@#$%^&*]{8,20}$/).test(passwd) == false)) {
		msg.style.display = "block";
		msg.innerHTML = "Invalid username/password.<br/>";
	}
	else {
		xhr.onreadystatechange = function() {
	    if (xhr.status == 200 && xhr.readyState == 4) {
				msg.innerHTML = xhr.responseText;
				if (msg.innerHTML !== "")
					msg.style.display = "block";
				else
					location.reload(true);
			}
		}
			xhr.open("POST", "server/login.php", true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send("login=" + login + "&passwd=" + passwd);
	}
}

function	register_validate() {

	var msg = document.getElementById("register_msg"),
			login_elem = document.getElementById("username"),
			login = login_elem.value.trim(),
			passwd1_elem = document.getElementById("pass1"),
			passwd1 = passwd1_elem.value.trim(),
			passwd2_elem = document.getElementById("pass2"),
			passwd2 = passwd2_elem.value.trim(),
			email = document.getElementById("email").value.trim(),
			xhr = new XMLHttpRequest();

	reset_msgs();
	if (login === "" || passwd1 === "" || passwd2 === "" || email === "") {
		msg.innerHTML = "⚠️Please fill in all fields.<br/>";
		msg.style.display = "block";
		return ;
	}
	if (login_elem.validity.RangeUnderflow || login_elem.validity.RangeOverflow ||
	((/^[a-zA-Z0-9_-]{5,20}$/).test(login) == false))
		msg.innerHTML += "⚠️Username must be at least 5 characters. Allowed characters : a-z, A-Z, 0-9, '-' and '_'.<br/>";
	if (passwd1_elem.validity.RangeUnderflow || passwd1_elem.validity.RangeOverflow ||
	((/^[a-zA-Z0-9!@#$%^&*]{8,20}$/).test(passwd1) == false))
	 	msg.innerHTML += "⚠️Password must be between 8 and 20 characters, special characters allowed are [!@#$%^&*].<br/>";
	if (passwd1.indexOf(login) !== -1)
		msg.innerHTML += "⚠️Password must not contains your username.<br/>";
	if (passwd1 !== passwd2)
		msg.innerHTML += "⚠️Password fields do not match.<br/>";
	if ((/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).test(email) == false)
		msg.innerHTML += "⚠️Email address is invalid.<br/>";
	if (msg.innerHTML !== "")
		msg.style.display = "block";
	else {
		xhr.onreadystatechange = function() {
    	if (xhr.status == 200 && xhr.readyState == 4){
				msg.innerHTML = xhr.responseText;
				if (msg.innerHTML !== "")
					msg.style.display = "block";
				else {
					reset_forms_inputs();
					put_login_form();
					var validation_msg = document.getElementById("main_msg");
					validation_msg.innerHTML = "✅A confirmation email has been sent to "+ email + ".<br/>";
					validation_msg.style.display = "block";
				}
			}
		}
		xhr.open("POST", "server/register.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send("login=" + login + "&passwd=" + passwd1 + "&email=" + email);
	}
}

function	resetpass_validate() {

	var msg = document.getElementById("resetpass_msg");
	var login_elem = document.getElementById("resetpass_login");
	var login = login_elem.value.trim();
	var	email = document.getElementById("resetpass_email").value.trim();
	var xhr = new XMLHttpRequest();

	reset_msgs();
	if (login === "" || email === "") {
		msg.style.display = "block";
		msg.innerHTML = "⚠️Please fill in all fields.<br/>";
		return ;
	}
	if (login_elem.validity.RangeUnderflow || login_elem.validity.RangeOverflow ||
	((/^[a-zA-Z0-9_-]{5,20}$/).test(login) == false)) {
		msg.style.display = "block";
		msg.innerHTML += "⚠️Invalid username.<br/>";
	}
	if ((/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).test(email) == false) {
		msg.style.display = "block";
		msg.innerHTML += "⚠️Invalid email address.<br/>"
	}
	if (msg.innerHTML === "") {
		xhr.onreadystatechange = function() {
	    if (xhr.status == 200 && xhr.readyState == 4) {
				msg.innerHTML = xhr.responseText;
				if (msg.innerHTML !== "")
					msg.style.display = "block";
				else {
					reset_forms_inputs();
					put_login_form();
					var validation_msg = document.getElementById("main_msg");
					validation_msg.innerHTML = "✅An email has been sent to you with the new password.<br/>";
					validation_msg.style.display = "block";
				}
			}
		}
			xhr.open("POST", "server/reset_pass.php", true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send("login=" + login + "&email=" + email);
	}
}
