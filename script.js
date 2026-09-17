// script.js — FULL FINAL, YOUR ORIGINAL pdf_ VARIABLE NAMES PRESERVED
document.addEventListener('DOMContentLoaded', function () {
// =============================================
// 1. DARK / LIGHT THEME
// =============================================
const themeToggleBtn = document.querySelector('.theme-toggle');
const htmlRoot = document.documentElement;
const savedTheme = localStorage.getItem('collegeTheme') || 'light';
htmlRoot.setAttribute('data-theme', savedTheme);
if(themeToggleBtn){
  themeToggleBtn.textContent = savedTheme === 'dark' ? "☀️ " : "🌙";
  themeToggleBtn.addEventListener('click', ()=>{
    let current = htmlRoot.getAttribute('data-theme');
    let newTheme = current === 'dark' ? 'light' : 'dark';
    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('collegeTheme', newTheme);
    themeToggleBtn.textContent = newTheme === 'dark' ? "☀️" : "🌙";
    showToast("Theme updated", "info");
  })
}

// =============================================
// 2. Toast Pop‑up System
// =============================================
const toastContainer = document.createElement('div');
toastContainer.className = "toast-container";
document.body.appendChild(toastContainer);
window.showToast = function(message, type="success"){
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerText = message;
  toastContainer.appendChild(toast);
  setTimeout(()=> toast.classList.add('show'), 10);
  setTimeout(()=>{
    toast.classList.remove('show');
    setTimeout(()=> toast.remove(), 350);
  }, 3200);
}

// =============================================
// 3. Hamburger Mobile Menu
// =============================================
const hamburger = document.querySelector('.hamburger');
const navEl = document.querySelector('nav');
if(hamburger && navEl){
  hamburger.addEventListener('click', ()=>{
    navEl.classList.toggle('open');
  })
  const navLinks = navEl.querySelectorAll('.nav-links-wrapper a');
  navLinks.forEach(link=>{
    link.addEventListener('click',()=>{
      if(window.innerWidth <=768){
        navEl.classList.remove('open');
      }
    })
  })
}

// =============================================
// 4. Back‑To‑Top Button
// =============================================
const backToTopBtn = document.getElementById('backToTop');
if(backToTopBtn){
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 350){
      backToTopBtn.classList.add('visible');
    }else{
      backToTopBtn.classList.remove('visible');
    }
  })
  backToTopBtn.addEventListener('click', ()=>{
    window.scrollTo({top:0, behavior:'smooth'});
  })
}

// =============================================
// 5. FAQ Accordion
// =============================================
const faqDetails = document.querySelectorAll('details');
faqDetails.forEach(detail => {
  detail.addEventListener('toggle', function(){
    if(this.open){
      faqDetails.forEach(other=>{
        if(other !== this) other.open = false;
      })
    }
  })
})

// =============================================
// 6. OLD TOAST FORM VALIDATIONS
// =============================================
function isEmailValid(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
function isPasswordValid(pass){
  return pass.length >=6;
}

const loginForm = document.querySelector('form[action="#"]:has(input[name="email"][name="password"])');
if(loginForm){
  loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    const email = this.querySelector('[name="email"]').value.trim();
    const password = this.querySelector('[name="password"]').value;
    if(!isEmailValid(email)){ showToast("Please enter valid email address", "error"); return; }
    if(!isPasswordValid(password)){ showToast("Password must be minimum 6 characters", "error"); return; }
    showToast("Login form validated successfully!", "success");
  })
}

const signupForm = document.querySelector('form[action="#"]:has(input[name="pass1"])');
if(signupForm){
  signupForm.addEventListener('submit', function(e){
    e.preventDefault();
    const fullname = this.querySelector('[name="fullname"]').value.trim();
    const email = this.querySelector('[name="email"]').value.trim();
    const pass1 = this.querySelector('[name="pass1"]').value;
    const pass2 = this.querySelector('[name="pass2"]').value;
    const phone = this.querySelector('[name="phone"]').value.trim();
    if(fullname.length <3){ showToast("Full name required (min 3 characters)", "error"); return; }
    if(!isEmailValid(email)){ showToast("Invalid email format", "error"); return; }
    if(!isPasswordValid(pass1)){ showToast("Password must be at least 6 characters", "error"); return; }
    if(pass1 !== pass2){ showToast("Passwords do not match", "error"); return; }
    if(phone.length < 10){ showToast("Please enter valid phone number", "error"); return; }
    showToast("Sign‑up form validated ✔", "success");
  })
}

const contactForm = document.querySelector('main form:has(textarea[name="message"])');
if(contactForm){
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const name = this.querySelector('[name="name"]').value.trim();
    const email = this.querySelector('[name="email"]').value.trim();
    const subject = this.querySelector('[name="subject"]').value.trim();
    const msg = this.querySelector('[name="message"]').value.trim();
    if(name.length <2){ showToast("Please enter your full name", "error"); return; }
    if(!isEmailValid(email)){ showToast("Valid email required", "error"); return; }
    if(subject.length <3){ showToast("Subject cannot be short", "error"); return; }
    if(msg.length <10){ showToast("Message needs at least 10 characters", "error"); return; }
    showToast("Your message sent successfully!", "success");
    this.reset();
  })
}

const regForm = document.querySelector('form[enctype="multipart/form-data"]');
if(regForm){
  regForm.addEventListener('submit', function(e){
    e.preventDefault();
    const fullname = this.querySelector('[name="fullname"]').value.trim();
    const email = this.querySelector('[name="email"]').value.trim();
    const password = this.querySelector('[name="password"]').value;
    const phone = this.querySelector('[name="phone"]').value.trim();
    const age = Number(this.querySelector('[name="age"]').value);
    const dept = this.querySelector('[name="department"]').value;
    if(fullname.length <3){ showToast("Full name required", "error"); return; }
    if(!isEmailValid(email)){ showToast("Invalid email address", "error"); return; }
    if(!isPasswordValid(password)){ showToast("Password minimum 6 characters", "error"); return; }
    if(phone.length < 10){ showToast("Enter valid phone number", "error"); return; }
    if(isNaN(age) || age <15 || age>60){ showToast("Age must be between 15‑60", "error"); return; }
    if(dept === ""){ showToast("Please select department", "error"); return; }
    showToast("Student Registration form validated ✔", "success");
  })
}

// ===================== PDF CODE : SIGNUP — YOUR EXACT pdf_ VARIABLE NAMES =====================
const pdf_signupForm = document.getElementById("signup-form");
if(pdf_signupForm){
    // ALL these variables stay YOUR original names from screenshot
    const pdf_nameInput = document.getElementById("name");
    const pdf_emailInput = document.getElementById("email");
    const pdf_phoneInput = document.getElementById("phone");
    const pdf_passwordInput = document.getElementById("password");
    const pdf_confirmPasswordInput = document.getElementById("confirm-password");

    const pdf_nameError = document.getElementById("name-error");
    const pdf_emailError = document.getElementById("email-error");
    const pdf_phoneError = document.getElementById("phone-error");
    const pdf_passwordError = document.getElementById("password-error");
    const pdf_confirmPasswordError = document.getElementById("confirm-password-error");
    const pdf_successMessage = document.getElementById("success-message");

    pdf_signupForm.addEventListener("submit", function(event) {
        event.preventDefault();
        pdf_nameError.textContent = "";
        pdf_emailError.textContent = "";
        pdf_phoneError.textContent = "";
        pdf_passwordError.textContent = "";
        pdf_confirmPasswordError.textContent = "";
        pdf_successMessage.textContent = "";

        const name = pdf_nameInput.value.trim();
        const email = pdf_emailInput.value.trim();
        const phone = pdf_phoneInput.value.trim();
        const password = pdf_passwordInput.value;
        const confirmPassword = pdf_confirmPasswordInput.value;

        let isValid = true;
        if (name === "") { pdf_nameError.textContent = "Please enter your name."; isValid = false; }
        if (email === "") { pdf_emailError.textContent = "Please enter your email."; isValid = false; }
        else if (!email.includes("@")) { pdf_emailError.textContent = "Please enter a valid email."; isValid = false; }
        if (phone === "") { pdf_phoneError.textContent = "Please enter your phone number."; isValid = false; }
        else if (phone.length < 10) { pdf_phoneError.textContent = "Please enter a valid phone number."; isValid = false; }
        if (password === "") { pdf_passwordError.textContent = "Please enter a password."; isValid = false; }
        else if (password.length < 6) { pdf_passwordError.textContent = "Password must be at least 6 characters."; isValid = false; }
        if (confirmPassword === "") { pdf_confirmPasswordError.textContent = "Please confirm your password."; isValid = false; }
        else if (password !== confirmPassword) { pdf_confirmPasswordError.textContent = "Passwords do not match."; isValid = false; }

        if (!isValid) return;
        const user = { name: name, email: email, phone: phone, password: password };
        localStorage.setItem("user", JSON.stringify(user));
        pdf_successMessage.textContent = "Account created successfully!";
        setTimeout(()=> window.location.href = "login.html",1500);
    });
}

// ===================== PDF CODE : LOGIN — YOUR EXACT pdf_ VARIABLE NAMES =====================
const pdf_loginForm = document.getElementById("login-form");
if(pdf_loginForm){
    const pdf_loginEmail = document.getElementById("login-email");
    const pdf_loginPassword = document.getElementById("login-password");
    const pdf_loginEmailError = document.getElementById("login-email-error");
    const pdf_loginPasswordError = document.getElementById("login-password-error");
    const pdf_loginSuccess = document.getElementById("login-success");

    pdf_loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        pdf_loginEmailError.textContent = "";
        pdf_loginPasswordError.textContent = "";
        pdf_loginSuccess.textContent = "";

        const email = pdf_loginEmail.value.trim();
        const password = pdf_loginPassword.value;
        let isValid = true;
        if (email === "") { pdf_loginEmailError.textContent = "Please enter your email."; isValid = false; }
        if (password === "") { pdf_loginPasswordError.textContent = "Please enter your password."; isValid = false; }
        if (!isValid) return;

        const savedUser = localStorage.getItem("user");
        if(savedUser === null){
            pdf_loginEmailError.textContent = "No account found. Please sign up first.";
            return;
        }
        const user = JSON.parse(savedUser);
        if(email !== user.email){
            pdf_loginEmailError.textContent = "Incorrect email.";
            return;
        }
        if(password !== user.password){
            pdf_loginPasswordError.textContent = "Incorrect password.";
            return;
        }
        pdf_loginSuccess.textContent = "Login successful!";
        localStorage.setItem("isLoggedIn","true");
    });
}

// ===================== PDF CODE : FORGOT PASSWORD — YOUR EXACT pdf_ VARIABLE NAMES =====================
const pdf_forgotForm = document.getElementById("forgot-form");
if(pdf_forgotForm){
    const pdf_forgotEmail = document.getElementById("forgot-email");
    const pdf_newPassword = document.getElementById("new-password");
    const pdf_confirmPassword = document.getElementById("confirm-password");
    const pdf_forgotEmailError = document.getElementById("forgot-email-error");
    const pdf_newPasswordError = document.getElementById("new-password-error");
    const pdf_confirmPasswordError = document.getElementById("confirm-password-error");
    const pdf_forgotSuccess = document.getElementById("forgot-success");

    pdf_forgotForm.addEventListener("submit", function(event){
        event.preventDefault();
        pdf_forgotEmailError.textContent = "";
        pdf_newPasswordError.textContent = "";
        pdf_confirmPasswordError.textContent = "";
        pdf_forgotSuccess.textContent = "";

        const email = pdf_forgotEmail.value.trim();
        const password = pdf_newPassword.value;
        const confirmPasswordValue = pdf_confirmPassword.value;
        let isValid = true;

        if(email === ""){ pdf_forgotEmailError.textContent="Please enter your email."; isValid=false; }
        if(password === ""){ pdf_newPasswordError.textContent="Please enter a new password."; isValid=false; }
        else if(password.length<6){ pdf_newPasswordError.textContent="Password must be at least 6 characters."; isValid=false; }
        if(confirmPasswordValue === ""){ pdf_confirmPasswordError.textContent="Please confirm your password."; isValid=false; }
        else if(password !== confirmPasswordValue){ pdf_confirmPasswordError.textContent="Passwords do not match."; isValid=false; }

        if(!isValid) return;
        const savedUser = localStorage.getItem("user");
        if(savedUser === null){
            pdf_forgotEmailError.textContent = "No account found. Please create an account first.";
            return;
        }
        const user = JSON.parse(savedUser);
        if(email.toLowerCase() !== user.email.toLowerCase()){
            pdf_forgotEmailError.textContent = "No account found with this email.";
            return;
        }
        user.password = password;
        localStorage.setItem("user", JSON.stringify(user));
        pdf_forgotSuccess.textContent = "Password updated successfully!";
        setTimeout(()=> window.location.href="login.html",1500);
    });
}

// ===== Homepage Pop‑up Modal Countdown =====
const admissionModal = document.getElementById("admissionModal");
const modalClose = document.getElementById("modalClose");
const popDays = document.getElementById("popDays");
const popHours = document.getElementById("popHours");
const popMinutes = document.getElementById("popMinutes");
const popSeconds = document.getElementById("popSeconds");
const popMsg = document.getElementById("popMsg");
const popTargetDate = new Date("August 30, 2026 23:59:59").getTime();
let popCountdownTimer;

function startPopupTimer(){
    if(!popDays || !popHours || !popMinutes || !popSeconds || !popMsg){
        clearInterval(popCountdownTimer);
        return;
    }
    popCountdownTimer = setInterval(function(){
        const now = new Date().getTime();
        const diff = popTargetDate - now;
        if(diff <= 0){
            clearInterval(popCountdownTimer);
            popDays.textContent="00";
            popHours.textContent="00";
            popMinutes.textContent="00";
            popSeconds.textContent="00";
            popMsg.textContent="⚠️ Admissions are closed now";
            return;
        }
        const d = Math.floor(diff / (1000*60*60*24));
        const h = Math.floor((diff % (1000*60*60*24))/(1000*60*60));
        const m = Math.floor((diff % (1000*60*60))/(1000*60));
        const s = Math.floor((diff % (1000*60)) /1000);
        popDays.textContent = String(d).padStart(2,"0");
        popHours.textContent = String(h).padStart(2,"0");
        popMinutes.textContent = String(m).padStart(2,"0");
        popSeconds.textContent = String(s).padStart(2,"0");
    },1000);
}

function closePopupModal(){
    if(admissionModal) admissionModal.classList.remove("show");
    clearInterval(popCountdownTimer);
}

if(admissionModal && modalClose){
    admissionModal.classList.add("show");
    startPopupTimer();
    modalClose.addEventListener("click", closePopupModal);
    admissionModal.addEventListener("click", function(e){
        if(e.target === admissionModal){
            closePopupModal();
        }
    });
}

console.log(" ABC College script.js loaded");
});