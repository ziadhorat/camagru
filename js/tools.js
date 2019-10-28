function	put_login_form() {

	var login_div = document.getElementById("form1");
	var register_div = document.getElementById("form2");
	var resetpass_div = document.getElementById("form3");

	reset_msgs();
	login_div.style.display = "table";
	register_div.style.display = "table";
	resetpass_div.style.display = "none";
}

function	put_resetpass_form() {

	var login_div = document.getElementById("form1");
	var register_div = document.getElementById("form2");
	var resetpass_div = document.getElementById("form3");

	login_div.style.display = "none";
	register_div.style.display = "none";
	resetpass_div.style.display = "table";
}

function reset_msgs() {

  var msg1 = document.getElementById("register_msg");
  var msg2 = document.getElementById("login_msg");
  var msg3 = document.getElementById("main_msg");
  var msg4 = document.getElementById("resetpass_msg");

  if (msg1.innerHTML !== "" || msg1.style.display !== "none") {
    msg1.innerHTML = "";
    msg1.style.display = "none";
  }
  if (msg2.innerHTML !== "" || msg2.style.display !== "none") {
    msg2.innerHTML = "";
    msg2.style.display = "none";
  }
  if (msg3.innerHTML !== "" || msg3.style.display !== "none") {
    msg3.innerHTML = "";
    msg3.style.display = "none";
  }
  if (msg4.innerHTML !== "" || msg4.style.display !== "none") {
    msg4.innerHTML = "";
    msg4.style.display = "none";
  }
}

function reset_forms_inputs() {

	var inputs_array = document.getElementsByTagName("input");

	for (var i = 0; i < inputs_array.length; i++) {
		if (inputs_array[i].type != "button")
			inputs_array[i].value = "";
	}
}
