document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    resetErrors();
    
    let isValid = true;
    
    if (name === '') {
        showError('nameError', 'Name is required');
        isValid = false;
    }
       
    if (email === '') {
        showError('emailError', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email');
        isValid = false;
    }
    
    if (phone !== '' && !isValidPhone(phone)) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    }
    
    if (subject === '') {
        showError('subjectError', 'Subject is required');
        isValid = false;
    }
    
    if (message === '') {
        showError('messageError', 'Message is required');
        isValid = false;
    }
    
    if (isValid) {
        document.getElementById('successMessage').textContent = 'Message sent successfully!';
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('contactForm').reset();
        
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 3000);
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function resetErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
    document.getElementById('successMessage').style.display = 'none';
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.com/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[+]?[\d\s-]+$/;
    return re.test(phone);
}