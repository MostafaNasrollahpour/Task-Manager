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
    return true;
}

async function sendData(data) {
    try {
        const response = await fetch('http://127.0.0.1:8000/signup', {
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

document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('sign_up_form').addEventListener('submit', async function(e) {
        e.preventDefault();
        if (checkInputs()) {
            const formData = {
                email: document.getElementById('email').value,
                password: document.getElementById('pass').value,
            };
            
            console.log(JSON.stringify(formData));

            try {
                const result = await sendData(formData);
                console.log(result);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });
    
});

