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

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script is running');
    
    document.getElementById('create-project-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (checkInputs()) {
            document.getElementById('submit_btn').style.display = 'none'
            const formData = {
                name: document.getElementById('project_name').value.toLowerCase(),
                start_date: document.getElementById('start_date').value,
                manager: document.getElementById('manager').value.toLowerCase(),
                end_date: document.getElementById('end_date').value,
                description: document.getElementById('description').value,
                status : 0,
                worker: document.getElementById('receiver').value.toLowerCase(),
                priority: document.getElementById('priority').value
            };
            console.log(JSON.stringify(formData))
            async function sendData(data) {
                try {
                    const response = await fetch('http://127.0.0.1:8000/create-project', {
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
                // you can write your code here
            } catch (error) {
                console.error('Error:', error);
            }
        }

    });
});
