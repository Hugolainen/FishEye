  // DOM Elements
  const modalForm = document.getElementById('modalForm');
  const modalBtn = document.getElementById('modal-btn');
  const closeModalBtn = document.getElementById('btn-close');
  const formSubmitBtn = document.getElementById('btn-submit');
  
  const formFirst = document.getElementById('first');
  const formLast = document.getElementById('last');
  const formEmail = document.getElementById('email');
  const formMessage = document.getElementById('message');
  
  const first_errMessage = document.getElementById('first_errorMessage');
  const last_errMessage = document.getElementById('last_errorMessage');
  const email_errMessage = document.getElementById('email_errorMessage');
  const message_errMessage = document.getElementById('message_errorMessage');
  const submitSucess_message = document.getElementById('message-submitSucess');
  
  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
  
  // launch modal form
  function launchModal() {
    modalForm.style.display = "block";
  }
  
  // close model with "cross" or with "close button" after successful submit
  closeModalBtn.addEventListener('click', ($event) => {
    $event.preventDefault();
    closeModal();
  });
  
  // close modal form
  function closeModal() {
    modalForm.style.display = "none";
  
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
    if(formMessage.value.length<50 || formMessage.value.length>250)
    {
      message_errMessage.textContent = "Please enter a message from 50 to 250 char";
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
  formSubmitBtn.addEventListener('click', ($event) => {
    $event.preventDefault();
  
    if(validateFirst()
    && validateLast()
    && validateEmail()
    && validateMessage())
    {
      submitSucess_message.style.display = "block";
      setTimeout(closeModal, 2000);
    }
  });
  
  