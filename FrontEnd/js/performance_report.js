async function sendData(data, url) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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

document.addEventListener('DOMContentLoaded', function () {
    async function main() {
        try {
            // Retrieve current user from localStorage
            let currentUser = localStorage.getItem('currentUser');
            currentUser = JSON.parse(currentUser);

            // Send data to the server
            const result = await sendData(currentUser, 'http://127.0.0.1:8000/get-my-projects');

            // Get the projects from the result
            const projects = result.projects;

            // Get the container element
            const container = document.getElementById('container');


            // Create and append project cards to the container
            projects.forEach((project) => {
                const div = document.createElement('div');
                div.className = 'card';
                div.innerHTML = `
                    <div class="card-content">
                        <h5>Name: ${project.name}</h5>
                        <h5>Manager: ${project.manager}</h5>
                        <h5>Start Date: ${project.start_date}</h5>
                        <h5>End Date: ${project.end_date}</h5>
                        <h5>Description: ${project.description}</h5>
                        <h5>Priority: ${project.priority}</h5>
                        <form id="myForm-${project.id}">
                            <select class="form-select" name="${project.id}" required>
                                <option value="">Select a percentage</option>
                                <option value="0">0%</option>
                                <option value="25">25%</option>
                                <option value="50">50%</option>
                                <option value="75">75%</option>
                                <option value="100">100%</option>
                            </select>
                            <div class="d-flex justify-content-center sub">
                                <button type="submit" class="btn">Submit</button>
                            </div>
                        </form>
                    </div>
                `;
                container.appendChild(div);
            });

            // Add submit event listeners to all forms
            document.querySelectorAll('.card').forEach((card) => {
                const form = card.querySelector('form');
                if (form) {
                    form.addEventListener('submit', handleSubmit);
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Call the main function
    main();

    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .card {
            border: 1px solid #ccc;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
        }
        .card-content {
            background-color: #f0f0f0;
            padding: 10px;
        }
    `;
    document.head.appendChild(style);

    // Function to handle form submission
    async function handleSubmit(event) {
        event.preventDefault(); // Prevent the form from refreshing the page

        // Get the select element within the form
        const select = event.target.querySelector('.form-select');
        
        // Optionally, log the project name
        const projectId = select.name;

        // Get the selected value
        const selectedValue = select.value;

        const formData = {
            id: parseInt(projectId),
            status: parseInt(selectedValue)
        }

        try {
            const result = await sendData(formData, 'http://127.0.0.1:8000/update-status');
            if(result.is_succes == 'true'){
                alert('project updated')
            } else {
                alert(result.detail)
            }
        } catch (error) {
            console.error('Error:', error);
        }

        // Redirect to the status reports page
        window.location.replace('project_information.html');
    }
});