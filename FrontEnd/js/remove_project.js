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
        currentUser = JSON.parse(currentUser);

        const result = await sendData(currentUser);

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
                    <h5 class="for-admin">Priority: ${project.priority}</h5>
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
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
        console.log(`Project removed: ${event.target.getAttribute('data-name')}`);
        
        // Remove the entire card element
        event.target.closest('.card').remove();
    }
});
