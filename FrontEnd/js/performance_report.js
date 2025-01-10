document.addEventListener('DOMContentLoaded', function() {
    const items = ['project1', 'project2'];

    const container = document.getElementById('container');

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
        <div class="card-content">
            <h5>${item}</h5>
            <form id="myForm-${item}">
                <select class="form-select" name="${item}" required>
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