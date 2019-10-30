window.addEventListener('load', function(ev) {

  var xhr = new XMLHttpRequest(),
	  photos_container = document.getElementById("photos_container"),
	  filters_container = document.getElementById("filters_container"),
	  video = document.getElementById("video");
	  video_img = document.getElementById("video_img"),
	  startbutton = document.getElementById("startbutton");
	  g_filter_set = 0;

  startbutton.setAttribute("style", "background-color: #0C819C");
  xhr.onreadystatechange = function() {
	if (xhr.status == 200 && xhr.readyState == 4) {
	  var imgs = xhr.responseText.split("\0");
	  photos_container.innerHTML += imgs[0];
	  filters_container.innerHTML += imgs[1];
	}
  }
  xhr.open("GET", "server/load_imgs.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send();
  load_cam();
});


window.addEventListener('resize', function(ev) {

  if (g_filter_set == 1) {
	var src = streaming === true ? document.getElementById("video") :
	document.getElementById("video_img");
	clear_filter_display(src);
  }
});


function get_drawing_sizes(src, dst) {

  var x, y, width, height,
	  coef = 1,
	  sizes = [];
  while (((width = (src.naturalWidth * coef)) > (dst.offsetWidth / 2.3)) ||
		((height = (src.naturalHeight * coef)) > (dst.offsetHeight / 2.3)))
	coef = coef - 0.02;
  x = (dst.offsetWidth / 2) - (width / 2);
  y = (dst.offsetHeight / 4) - (height / 4);
  sizes.push(x, y, width, height);
  return (sizes);
}


function add_filter(filter) {
  if (streaming === false && video_img.src === "") {
	alert("Launch the camera or upload an image before choosing a picture");
	return;
  }
  var draw = new Image(),
	  container = document.getElementById("cam_container"),
	  filter_canvas = document.getElementById("filter_canvas"),
	  ctx = filter_canvas.getContext("2d"),
	  src = streaming === true ? document.getElementById("video") :
	  document.getElementById("video_img"),
	  sizes = get_drawing_sizes(filter, src);

  ctx.clearRect(0, 0, filter_canvas.offsetWidth, filter_canvas.offsetHeight);
  filter_canvas.setAttribute('width', src.offsetWidth);
  filter_canvas.setAttribute('height', src.offsetHeight);
  draw.src = filter.src;
  draw.onload = function () {
	ctx.drawImage(draw, sizes[0], sizes[1], sizes[2], sizes[3]);
	document.getElementById("startbutton").removeAttribute("style");
	g_filter_set = 1;
  };
}


function isImage(file) {

  var dot_index;
  if ((dot_index = file.lastIndexOf(".")) < 1)
	return (false);
  var file_extension = file.substr(dot_index + 1);
  switch (file_extension.toLowerCase()) {
	case "jpg":
	case "jpeg":
	case "png":
	  return (true);
  }
  return (false);
}


function clear_filter_display(src) {

  var filter_canvas = document.getElementById("filter_canvas"),
	  ctx = filter_canvas.getContext("2d");

  startbutton.setAttribute("style", "background-color: green");
  ctx.clearRect(0, 0, filter_canvas.width, filter_canvas.height);
  filter_canvas.removeAttribute("width");
  filter_canvas.removeAttribute("height");
  g_filter_set = 0;
}


document.getElementById("send_img").addEventListener("click", function(ev) {

  var file_input = document.getElementById("img_file"),
	  img = document.getElementById("video_img"),
	  video = document.getElementById("video"),
	  msg = document.getElementById("upload_msg"),
	  back2cam = document.getElementById("back2cam"),
	  filter_canvas = document.getElementById("filter_canvas");

  if (msg.innerHTML !== "") {
	msg.innerHTML = "";
	msg.style.display = "none";
  }
  if (file_input.value === "")
	msg.innerHTML = "Please choose a file.<br/>"
  else if (isImage(file_input.value) === false)
	msg.innerHTML = "Invalid file.<br/>"
  else if (file_input.files[0].size > 4096000) {
	msg.innerHTML = "File size limit exceeded.<br/>";
  }
  else {
	var reader = new FileReader();
	reader.onloadend = function (ev) {
	  img.setAttribute("src", ev.target.result);
	  if (streaming === true) {
		video.pause();
		streaming = false;
	  }
	  back2cam.style.display = "block";
	  video.style.display = "none";
	  img.style.display = "inherit";
	  clear_filter_display(img);
	}
	reader.readAsDataURL(file_input.files[0]);
	file_input.value = null;
  }
  if (msg.innerHTML !== "")
	msg.style.display = "block";
});


function delete_img(img) {

  if (confirm("Are you sure you want to delete this image ?")) {

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	  if (xhr.status == 200 && xhr.readyState == 4) {
		if (xhr.responseText !== "")
		  console.log(xhr.responseText);
		else {
		  img.parentNode.removeChild(img);
		  if (document.getElementsByClassName("photos").length === 0) {
			var photo_default = document.createElement("img");
			photo_default.setAttribute("id", "photo_default");
			photo_default.setAttribute("class", "photos");
			photo_default.setAttribute("src", "images/icons/photo_default.jpg");
			photo_default.setAttribute("width", 320);
			photo_default.setAttribute("height", 240);
			document.getElementById("photos_container").appendChild(photo_default);
		  }
		}
	  }
	}
	  xhr.open("POST", "server/delete_img.php", true);
	  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	  xhr.send("img=" + img.getAttribute("src"));
  }
}


  function reload_cam() {
	var back2cam = document.getElementById("back2cam");

	video_img.style.display = "none";
	video_img.removeAttribute("src");
	video.style.display = "initial";
	back2cam.style.display = "none";
	clear_filter_display(video);
	if (g_stream != false) {
	  video.play();
	  streaming = true;
	}
  }


  function load_cam() {

  streaming = false,
  g_stream = false;
  var video = document.querySelector('#video'),
	  cover = document.querySelector('#cover'),
	  container = document.querySelector('#photos_container'),
	  startbutton = document.querySelector('#startbutton'),
	  back2cam = document.querySelector('#back2cam'),
	  canvas = document.createElement("canvas"),
	  filter_canvas = document.querySelector('#filter_canvas'),
	  g_width = 640,
	  g_height = 480;

  navigator.getMedia = ( navigator.getUserMedia ||
						 navigator.webkitGetUserMedia ||
						 navigator.mozGetUserMedia ||
						 navigator.msGetUserMedia);

navigator.mediaDevices.getUserMedia({video: true, audio: false}
)
.then(function(stream) {
	//link to the video source
	video.srcObject = stream;
	//play video
	video.play();
})
.catch(function(err){
	console.log(`Error: ${err}`);
});

  function set_img_attributes(img) {

	img.setAttribute('class', 'photos');
	img.setAttribute('onclick', 'delete_img(this)');
	img.setAttribute('style', 'cursor:pointer');
  }

  video.addEventListener('canplay', function(ev) {

	if (!streaming) {
	  video.setAttribute('width', g_width);
	  video.setAttribute('height', g_height);
	  video.style.display = "initial";
	  filter_canvas.setAttribute('width', video.offsetWidth);
	  filter_canvas.setAttribute('height', video.offsetHeight);
	  streaming = true;
	  back2cam.style.display = "none";
	}
  }, false);

  function takephoto(canvas) {

	canvas.getContext('2d').drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight);
	var img = canvas.toDataURL('image/png');
	return (img);
  }

  function save_and_display_photo(img_data, filter_data) {

	var xhr = new XMLHttpRequest(),
		photos_array = document.getElementsByClassName("photos");

	if (img_data !== "" && filter_data !== "") {
  		xhr.onreadystatechange = function() {
		if (xhr.status == 200 && xhr.readyState == 4) {
		  if (xhr.responseText.indexOf("Error") === -1) {
			var photo = document.createElement("img");
			set_img_attributes(photo);
			photo.src = xhr.responseText;
			container.insertBefore(photo, photos_array[0]);
		  }
		  else
			console.log(xhr.responseText);
		}
	  }
	  xhr.open("POST", "server/store_img.php", true);
	  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	  xhr.send("img=" + img_data + "&filter=" + filter_data);
  	}
	else
	  console.log("Data missing to save the photo");
  }

  startbutton.addEventListener('click', function(ev) {

	var img,
		filter = document.getElementById("filter_canvas"),
		photo_default = document.getElementById("photo_default");

	if (g_filter_set === 0) {
	  alert("You must choose a picture before taking a photo");
	  return ;
	}
	if (photo_default !== null)
	  photo_default.parentNode.removeChild(photo_default);
	if (streaming === true) {
	  canvas.setAttribute("width", filter_canvas.offsetWidth);
	  canvas.setAttribute("height", filter_canvas.offsetHeight);
	  img = takephoto(canvas);
	  canvas.getContext("2d").clearRect(0, 0, filter_canvas.offsetWidth, filter_canvas.offsetHeight);
	}
	else
	  img = document.getElementById("video_img").src;
	save_and_display_photo(img, filter.toDataURL("image/png"));
	ev.preventDefault();
  }, false);
}
