async function sendData(data) {
    try {
        const response = await fetch('http://127.0.0.1:8000/get-my-users-projects', {
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

async function main() {
    try {
        let currentUser = localStorage.getItem('currentUser');
        currentUser = JSON.parse('{"email": "aryan"}');

        const result = await sendData(currentUser);

        const projects = result.projects;
        
        projects.forEach(project => {
            const div = document.createElement('div');
            div.className = 'card';
            
            // Create the card content
            const cardContent = `
                <div>
                    <h5 class="for-admin">Project name: ${project.name}</h5>
                    <h5 class="for-admin">Manager: ${project.manager}</h5>
                    <h5 class="for-admin">Receiver: ${project.receiver}</h5>
                    <h5 class="for-admin">Start date: ${project.start_date}</h5>
                    <h5 class="for-admin">End date: ${project.end_date}</h5>
                    <h5 class="for-admin">Description: ${project.descriptoin}</h5>
                    <h5 class="for-admin">Priority: ${project.priority}</h5>
                    <div class="d-flex justify-content-end">
                        <button type="button" class="remove-btn btn btn-warning" style="border:none;" project_edit="${project.id}">Edit</button>
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
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
        
        let selectedId = event.target.getAttribute('project_edit')

        const projectSelected = {
            id: parseInt(selectedId)
        }
        let id = JSON.stringify(projectSelected);
        localStorage.setItem("projectId", id);
        window.open('edit_project.html')
    }
});
