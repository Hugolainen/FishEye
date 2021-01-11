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

function generateFocusElement(media){
  
  if(media.image == undefined)
  {
    imgShow.innerHTML = "<video controls> <source src=\"public/img/media/" + media.video + "\" type=\"video/mp4\">" + media.alt + "</video>";
  }
  else{
    imgShow.innerHTML= "<img src=\"public/img/media/" + media.image + "\" alt=\""+ media.alt + "\">";
  } 
  
  
  imgName.innerHTML= media.alt;
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

prevImg.addEventListener('click', ($event) => {
  $event.preventDefault();
  prevImg();
});


nextImg.addEventListener('click', ($event) => {
  $event.preventDefault();
  nextImg();
});