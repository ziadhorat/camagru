function contact_me() {
  var name_elem = document.getElementById("contact_name"),
      name = name_elem.value.trim(),
      email_elem = document.getElementById("contact_email"),
      email = email_elem.value.trim(),
      msg_elem = document.getElementById("contact_msg"),
      msg = encodeURIComponent(msg_elem.value.trim()),
      error_msg = document.getElementById("contact_notif_msg"),
      xhr = new XMLHttpRequest();

  error_msg.innerHTML = "";
  error_msg.style.display = "none";
  error_msg.style.color = "red";
  if (name === "" || email === "" || msg === "")
    error_msg.innerHTML = "Please fill in all fields.<br>";
  else if ((/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).test(email) == false)
    error_msg.innerHTML = "Email address is invalid.<br/>";
  else if (msg_elem.validity.RangeUnderflow)
    error_msg.innerHTML = "Your message is too short to be relevant.<br/>";
  if (error_msg.innerHTML !== "")
    error_msg.style.display = "block";
  else {
    xhr.onreadystatechange = function() {
      if (xhr.status == 200 && xhr.readyState == 4) {
        if (xhr.responseText !== "")
          error_msg.innerHTML = xhr.responseText;
        else {
          error_msg.innerHTML = "Your message has been sent to the webmaster, thank you.<br/>"
          error_msg.style.color = "green";
          name_elem.value = "";
          email_elem.value = "";
          msg_elem.value = "";
        }
        error_msg.style.display = "block";
      }
    }
    xhr.open("POST", "../server/contact_me.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("name=" + name + "&email=" + email + "&msg=" + msg);
  }
}
