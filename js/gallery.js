function escape_html(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}


function reset_msgs() {
  var msgs_array = document.getElementsByClassName("error_msg");
  for (var i = 0; i < msgs_array.length; i++) {
    if (msgs_array[i].innerHTML !== "") {
      msgs_array[i].innerHTML = "";
      msgs_array[i].style.display = "none";
    }
  }
}

function get_img_id(img_child_id) {
  var start = img_child_id.indexOf("_"),
      img_id = img_child_id.substr(start + 1);
  return (img_id);
}


function add_like(like_button) {

  var img_id = get_img_id(like_button.id),
      nb_likes = document.getElementById("nblikes_" + img_id),
      nb_likes_value = parseInt(nb_likes.innerHTML);
      error_msg = document.getElementById("pubmsg_" + img_id),
      xhr = new XMLHttpRequest();

  reset_msgs();
  xhr.onreadystatechange = function() {
    if (xhr.status == 200 && xhr.readyState == 4) {
      if (xhr.responseText === "+1")
        nb_likes.innerHTML = nb_likes_value + 1;
      else if (xhr.responseText === "-1" && nb_likes_value > 0)
        nb_likes.innerHTML = nb_likes_value - 1;
      else {
        error_msg.innerHTML = xhr.responseText;
        error_msg.style.display = "block";
      }
    }
  }
  xhr.open("POST", "../server/add_like.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("img_id=" + img_id);
}


function send_comment(com_button) {
  reset_msgs();
  var img_id = get_img_id(com_button.id),
      container = document.getElementById("comcontainer_" + img_id);
      com_elem = document.getElementById("comcontent_" + img_id),
      com_content = com_elem.value.trim(),
      encoded = encodeURIComponent(com_content);
      error_msg = document.getElementById("pubmsg_" + img_id),
      xhr = new XMLHttpRequest();

  if (encoded === "") {
    error_msg.innerHTML = "Your comment is empty.<br/>";
    error_msg.style.display = "block";
    return ;
  }
  xhr.onreadystatechange = function() {
    if (xhr.status == 200 && xhr.readyState == 4) {
      if (xhr.responseText === "")
        window.location.replace("../index.php");
      else if (xhr.responseText.indexOf("OK_") !== 0) {
        error_msg.innerHTML = xhr.responseText;
        error_msg.style.display = "block"
      }
      else {
        var com_author = xhr.responseText.substr(3),
            new_com = document.createElement("p");
            new_com.setAttribute("class", "comments");
        new_com.innerHTML = "<strong>" + com_author + " :</strong> " + escape_html(decodeURIComponent(encoded));
        container.appendChild(new_com);
        com_elem.value = "";
      }
    }
  }
  xhr.open("POST", "../server/send_com.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("img_id=" + img_id + "&comment=" + encoded);
}


window.addEventListener('load', function(ev) {
  var error_msg = document.getElementById("gallery_main_msg");
      publications_container = document.getElementById("publications_container"),
      xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.status == 200 && xhr.readyState == 4) {
      if (xhr.responseText === "") {
        error_msg.innerHTML = "No publication to display";
        error_msg.style.display = "none";
      }
      else
        publications_container.innerHTML += xhr.responseText;
    }
  }
  xhr.open("GET", "../server/load_gallery.php?offset=0", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send();
});


document.getElementById("see_more").addEventListener('click', function(ev) {
  var nb_pub = document.querySelectorAll('main .publication').length,
      error_msg = document.getElementById("see_more_msg");
      publications_container = document.getElementById("publications_container"),
      xhr = new XMLHttpRequest();

  reset_msgs();
  xhr.onreadystatechange = function() {
    if (xhr.status == 200 && xhr.readyState == 4) {
      if (xhr.responseText === "") {
        error_msg.innerHTML = "No more publications to display";
        error_msg.style.display = "block";
      }
      else if (xhr.responseText.indexOf("Error") == 0) {
        error_msg.innerHTML = xhr.responseText;
        error_msg.style.display = "block";
      }
      else
        publications_container.innerHTML += xhr.responseText;
    }
  }
  xhr.open("GET", "../server/load_gallery.php?offset=" + nb_pub, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send();
});
