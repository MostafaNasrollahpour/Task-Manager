async function sendData(data, url) {
    try {
        const response = await fetch(url, {
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


function get_priority(priority){
    if (priority == 1){
        return "whenever you can"
    }else if(priority == 2){
        return "Normal"
    }else if(priority == 3){
        return "Necessary"
    }else if(priority == 4){
        return "Very necessary"
    }
}

async function main() {
    try {
        let currentUser = localStorage.getItem('currentUser');
        currentUser = JSON.parse(currentUser);

        const result = await sendData(currentUser, 'http://127.0.0.1:8000/get-my-users-projects');

        const projects = result.projects;
        console.log(projects)
        projects.forEach(project => {
            const div = document.createElement('div');
            div.className = 'card';
            
            // Create the card content/
            const cardContent = `
                <div>
                    <h5 class="for-admin">Project Name: ${project.name}</h5>
                    <h5 class="for-admin">Receiver: ${project.worker}</h5>
                    <h5 class="for-admin">Start Date: ${project.start_date}</h5>
                    <h5 class="for-admin">End Date: ${project.end_date}</h5>
                    <h5 class="for-admin">Description: ${project.description}</h5>
                    <h5 class="for-admin">Priority: ${get_priority(project.priority)}</h5>
                    <div class="d-flex justify-content-end">
                        <button type="button" class="remove-btn btn btn-danger" style="border:none;" data-name="${project.id}">Remove</button>
                    </div>
                </div>
            `;
            
            div.innerHTML = cardContent;
            
            container.appendChild(div);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

main();


// Add click event listener to all buttons
document.addEventListener('click', async function(event) {
    if (event.target.classList.contains('remove-btn')) {
        const projectSelected = {
            id: parseInt(event.target.getAttribute('data-name'))
        }

        try {
            const result = await sendData(projectSelected, 'http://127.0.0.1:8000/delete-project');
            if(result.is_succes == 'true'){
                // alert('project deleted')
            } else {
                alert(result.detail)
            }
        } catch (error) {
            console.error('Error:', error);
        }

        event.target.closest('.card').remove();
    }
});
