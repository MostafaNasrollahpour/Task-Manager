async function sendData(data) {
    try {
        const response = await fetch('http://127.0.0.1:8000/get-project', {
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
        
        projects.forEach(project => {
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `
                <div class="card-content">
                    <h3>${project.name}</h3>
                </div>
            `;
            container.appendChild(div);
        });
        


    } catch (error) {
        console.error('Error:', error);
    }
}

main();


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
