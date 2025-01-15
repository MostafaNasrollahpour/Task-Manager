async function sendData(data) {
    try {
        const response = await fetch('http://127.0.0.1:8000/get-one-project', {
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
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


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

async function main() {
    try {
        let projectSelected = localStorage.getItem('projectId');
        projectSelected = JSON.parse(projectSelected);

        const result = await sendData(projectSelected);

        const project = result.project;
        console.log(project)

        project_name =  document.getElementById('project_name')
        project_name.value = project['name']
        start_date = document.getElementById('start_date')
        start_date.value = project['start_date']
        end_date = document.getElementById('end_date')
        end_date.value = project['end_date']
        description = document.getElementById('description')
        description.value = project['description']
        manager = document.getElementById('manager')
        receiver.value = project['worker']
        receiver =  document.getElementById('receiver')
        manager.value = project['manager']
        switch(project['priority']){
            case 1:
                document.getElementById('for-selection').innerHTML = `
            <select 
                id="priority" class="form-select" style="border: 2px solid rgb(29, 30, 70) ;" required>
                <option value="">set a priority</option>
                <option value="4">Very necessary</option>
                <option value="3">Necessary</option>
                <option value="2">Normal</option>
                <option value="1" selected>whenever you can</option>
            </select>`
            break
            case 2:
                document.getElementById('for-selection').innerHTML = `
                <select 
                    id="priority" class="form-select" style="border: 2px solid rgb(29, 30, 70) ;" required>
                    <option value="">set a priority</option>
                    <option value="4">Very necessary</option>
                    <option value="3">Necessary</option>
                    <option value="2" selected>Normal</option>
                    <option value="1">whenever you can</option>
                </select>`
                break
            case 3:
                document.getElementById('for-selection').innerHTML = `
                <select 
                    id="priority" class="form-select" style="border: 2px solid rgb(29, 30, 70) ;" required>
                    <option value="">set a priority</option>
                    <option value="4">Very necessary</option>
                    <option value="3" selected>Necessary</option>
                    <option value="2">Normal</option>
                    <option value="1">whenever you can</option>
                </select>`
                break
            case 4:
                document.getElementById('for-selection').innerHTML = `
                <select 
                    id="priority" class="form-select" style="border: 2px solid rgb(29, 30, 70) ;" required>
                    <option value="">set a priority</option>
                    <option value="4" selected>Very necessary</option>
                    <option value="3">Necessary</option>
                    <option value="2">Normal</option>
                    <option value="1">whenever you can</option>
                </select>`
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
main()









document.addEventListener('DOMContentLoaded', function() {
    console.log('Script is running');
    
    document.getElementById('create-project-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (checkInputs()) {
            document.getElementById('submit_btn').style.display = 'none'
            const formData = {
                project_name: document.getElementById('project_name').value,
                start_date: document.getElementById('start_date').value,
                end_date: document.getElementById('end_date').value,
                description: document.getElementById('description').value,
                manager: document.getElementById('manager').value.toLowerCase(),
                receiver: document.getElementById('receiver').value.toLowerCase(),
                priority: document.getElementById('priority').value
            };
            console.log(JSON.stringify(formData))
            //update your code
        }

    });
});
