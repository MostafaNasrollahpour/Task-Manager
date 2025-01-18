// Define the Stack class
class Stack {
    constructor(array) {
        this.items = array;
    }
    pop() {
        if (this.isEmpty()) {
        throw new Error('Stack is empty');
    }
        return this.items.pop();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}


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

        const result = await sendData(currentUser);

        const projects = result.projects;
        

        projects.sort((a, b) => {
            const priorityA = typeof a.priority === 'number' ? a.priority : 0;
            const priorityB = typeof b.priority === 'number' ? b.priority : 0;
            return priorityA - priorityB;
        });

        let stack = new Stack(projects)

        while(!stack.isEmpty()){
            const project = stack.pop()
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `
                <div class="card-content">
                    <h3>Project Name: ${project.name}</h3>
                    <h3>Manager: ${project.manager}</h3>
                    <h3>Receiver: ${project.worker}</h3>
                    <h3>Start Date: ${project.start_date}</h3>
                    <h3>End Date: ${project.end_date}</h3>
                    <h3>Description: ${project.description}</h3>
                    <h3>Priority: ${get_priority(project.priority)}</h3>
                    <h3>Status: ${project.status}%</h3>
                </div>
            `;
            container.appendChild(div);
        }
        


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
