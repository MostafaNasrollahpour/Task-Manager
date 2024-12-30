function checkInputs() {
    const inputs = document.querySelectorAll('.in');
    let allValid = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            allValid = false;
            input.style.border = "2px solid red";
        } else {
            input.style.border = "1px solid #ccc";
        }
    });

    if (!allValid) {
        alert("Please fill out all fields.");
        return false;
    }

    const pass = document.getElementById('pass').value;
    const rePass = document.getElementById('re-pass').value;
    if (pass !== rePass) {
        alert("Passwords do not match");
        return false;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script is running');//just to check
    
    document.getElementById('sign_in_form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (checkInputs()) {
            const formData = {
                user_name : document.getElementById('name').value,
                user_email : document.getElementById('email').value,
                user_skills : document.getElementById('skills').value,
                user_history : document.getElementById('history').value,
                user_password : document.getElementById('pass').value
            }
            console.log(JSON.stringify(formData));// here you can write your code
        }
    });
});
