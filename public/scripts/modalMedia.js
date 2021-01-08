// DOM Elements
const modalMedia = document.getElementById('modalMedia');
const modalMedia_Close = document.getElementById('modalMedia_close');
const imgShow = document.getElementById('imgShow');
const imgName = document.getElementById('imgName');
const prevImg = document.getElementById('navButton_left');
const nextImg = document.getElementById('navButton_right');

// launch modal form
function launchModalMedia() {
  modalMedia.style.display = "block";
}

// close modal with "cross" or after successful submit
modalMedia_Close.addEventListener('click', ($event) => {
  $event.preventDefault();
  closeModalMedia();
});

// close modal form
function closeModalMedia() {
  modalMedia.style.display = "none";
}