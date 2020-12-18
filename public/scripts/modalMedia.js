// DOM Elements
const modalMedia = document.getElementById('modalMedia');
const modalMedia_Open = document.getElementById('modalMedia_open');
const modalMedia_Close = document.getElementById('modalMedia_close');
const imgShow = document.getElementById('imgShow');
const imgName = document.getElementById('imgName');
const prevImg = document.getElementById('navButton_left');
const nextImg = document.getElementById('navButton_right');

// Lunch modal event
modalMedia_Open.addEventListener('click', ($event) => {
  $event.preventDefault();
  launchModal();
});

// launch modal form
function launchModal() {
  modalMedia.style.display = "block";
}

// close modal with "cross" or after successful submit
modalMedia_Close.addEventListener('click', ($event) => {
  $event.preventDefault();
  closeModal();
});

// close modal form
function closeModal() {
  modalMedia.style.display = "none";
}