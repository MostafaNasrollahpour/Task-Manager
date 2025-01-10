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
                name: document.getElementById('name').value,
                email: document.getElementById('email').value.toLowerCase(),
                skills: document.getElementById('skills').value,
                work_history: document.getElementById('history').value,
                password: document.getElementById('pass').value,
            };
            console.log(JSON.stringify(formData));
            
            async function sendData(data) {
                try {
                    const response = await fetch('http://127.0.0.1:8000/signin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });
            
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
            
                    const result = await response.json();
                    console.log('Success:', result);
                    return result;
                } catch (error) {
                    console.error('Error:', error);
                    throw error;
                }
            }

            try {
                const result = await sendData(formData);
                console.log(result); 
                // here you can write your code
            } catch (error) {
                console.error('Error:', error);
            }
            
        }
    });
});
