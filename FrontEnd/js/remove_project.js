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

        projects.forEach(item => {
            const div = document.createElement('div');
            div.className = 'card';
            
            // Create the card content/
            const cardContent = `
                <div>
                    <h5 class="for-admin">${item.name}</h5>
                    <div class="d-flex justify-content-end">
                        <button type="button" class="remove-btn btn btn-danger" style="border:none;" data-name="${item}">Remove</button>
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
