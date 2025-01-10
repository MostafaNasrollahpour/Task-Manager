async function sendData(data) {
    try {
        const response = await fetch('http://127.0.0.1:8000/get-my-projects', {
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

document.addEventListener('DOMContentLoaded', function() {
    async function main() {
        try {

            let currentUser = localStorage.getItem('currentUser');
            currentUser = JSON.parse(currentUser);
    
            const result = await sendData(currentUser);
    
            const projects = result.projects;
            
            const container = document.getElementById('container');

            console.log(projects);

            projects.forEach(item => {
                const div = document.createElement('div');
                div.className = 'card';
                div.innerHTML = `
                <div class="card-content">
                    <h5>${item.name}</h5>
                    <form id="myForm-${item.name}">
                        <select class="form-select" name="${item.name}" required>
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

    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault();
      // Get all select elements within the form
        const selects = Array.from(event.target.elements).filter(el => el.name);
      // Collect selected values
        const selectedValues = selects.map(select => ({
        name: select.name,
        value: select.value
        }));

      // Log the selected values to console
        console.log('Selected values:', JSON.stringify(selectedValues, null, 2));
        window.location.replace('status_reports.html')
    }

    // Add submit event listeners to all forms
    document.querySelectorAll('.card').forEach(card => {
        card.querySelector('form')?.addEventListener('submit', handleSubmit);
    });


});