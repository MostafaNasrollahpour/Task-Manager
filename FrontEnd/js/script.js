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
    console.log('Script is running');
    
    document.getElementById('sign_in_form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (checkInputs()) {
            const formData = {
                username: document.getElementById('name').value,
                email: document.getElementById('email').value,
                skills: document.getElementById('skills').value,
                history: document.getElementById('history').value,
                password: document.getElementById('pass').value
            };
        }
    });
});
