// DOM Elements
const modalForm = document.getElementById('modalForm');
const modalForm_Open = document.getElementById('modalForm_open');
const modalForm_Close = document.getElementById('modalForm_close');
const modalForm_Submit = document.getElementById('modalForm_submit');

const formFirst = document.getElementById('first');
const formLast = document.getElementById('last');
const formEmail = document.getElementById('email');
const formMessage = document.getElementById('message');

const first_errMessage = document.getElementById('first_errorMessage');
const last_errMessage = document.getElementById('last_errorMessage');
const email_errMessage = document.getElementById('email_errorMessage');
const message_errMessage = document.getElementById('message_errorMessage');
const submitSucess_message = document.getElementById('message-submitSucess');


// Lunch modal event
modalForm_Open.addEventListener('click', ($event) => {
  $event.preventDefault();
  launchModalForm();
});

// launch modal form
function launchModalForm() {
  modalForm.style.display = "block";
  modalForm_Open.style.display = "none";
}

// close modal with "cross" or after successful submit
modalForm_Close.addEventListener('click', ($event) => {
  $event.preventDefault();
  closeModalForm();
});

// close modal form
function closeModalForm() {
  modalForm.style.display = "none";
  modalForm_Open.style.display = "block";

  // Reset messages
  first_errMessage.style.display = "none";  
  last_errMessage.style.display = "none";  
  email_errMessage.style.display = "none";  
  message_errMessage.style.display = "none"; 
  submitSucess_message.style.display = "none"; 
}

// Specific function is confirm the patern of an email address
function confirmEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// To validate inputs and update their linked error message
function validateFirst(){
  if(formFirst.value.length<2)
  {
    first_errMessage.textContent = "Please enter 2+ characters for name field";
    first_errMessage.style.display = "block";    
    return false;
  }
  else{
    first_errMessage.style.display = "none"; 
    return true;   
  }
}

function validateLast(){
  if(formLast.value.length<2)
  {
    last_errMessage.textContent = "Please enter 2+ characters for name field";
    last_errMessage.style.display = "block";  
    return false;  
  }
  else{
    last_errMessage.style.display = "none";   
    return true; 
  }
}

function validateEmail(){
  if(!confirmEmail(formEmail.value))
  {
    email_errMessage.textContent = "You must enter a valid email";
    email_errMessage.style.display = "block";  
    return false;  
  }
  else{
    email_errMessage.style.display = "none"; 
    return true;   
  }
}

function validateMessage(){
  if(formMessage.value.length<10 || formMessage.value.length>250)
  {
    message_errMessage.textContent = "Please enter a message from 10 to 250 char";
    message_errMessage.style.display = "block";  
    return false;  
  }
  else{
    message_errMessage.style.display = "none";   
    return true; 
  }
}

// Submit button
// Prevent the normal messages of the input to appear / and to reload
// Valide every input one by one (could aslo be all together)
// If OK, print a success message and open the success screen after 2s
modalForm_Submit.addEventListener('click', ($event) => {
  $event.preventDefault();

  if(validateFirst()
  && validateLast()
  && validateEmail()
  && validateMessage())
  {
    publishForm();
    submitSucess_message.style.display = "block";
    setTimeout(closeModalForm, 2000);
    setTimeout(cleanForm, 2000);
  }
});

// Empty the input text after a successful send
function cleanForm(){
  formFirst.value = "";
  formLast.value = "";
  formEmail.value = "";
  formMessage.value = "";
}

function publishForm()
{
  console.log(formFirst.value);
  console.log(formLast.value);
  console.log(formEmail.value);
  console.log(formMessage.value);
}