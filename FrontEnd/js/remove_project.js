const items = ['raziyeh', 'mostafa', 'mahtab', 'fgjhfog'];

items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'card';
    
    // Create the card content/
    const cardContent = `
        <div>
            <h5 class="for-admin">${item}</h5>
            <div class="d-flex justify-content-end">
                <button type="button" class="remove-btn btn btn-danger" style="border:none;" data-name="${item}">Remove</button>
            </div>
        </div>
    `;
    
    div.innerHTML = cardContent;
    
    container.appendChild(div);
});

// Add click event listener to all buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
        console.log(`Project removed: ${event.target.getAttribute('data-name')}`);
        
        // Remove the entire card element
        event.target.closest('.card').remove();
    }
});
