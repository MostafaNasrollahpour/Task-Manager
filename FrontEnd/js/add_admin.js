async function fetchData() {
    try {
        const response = await fetch('http://127.0.0.1:8000/get-users');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function useFetchedData() {
    const data = await fetchData(); 

    const users = data.users;

    console.log(users); 
    //your code goes here


    users.forEach(user => {
        const div = document.createElement('div');
        div.className = 'card';
        
        // Create the card content
        const cardContent = `
            <div>
                <h5 class="for-admin">Name: ${user.name}</h5>
                <h5 class="for-admin">Email: ${user.email}</h5>
                <div class="d-flex justify-content-end">
                    <button type="button" class="remove-btn btn btn-success" style="border:none;" data-name="${user.email}">Add</button>
                </div>
            </div>
        `;
        
        div.innerHTML = cardContent;
        
        container.appendChild(div);
    });

}

useFetchedData();

// Add click event listener to all buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
        console.log(`Name added: ${event.target.getAttribute('data-name')}`);
        
        // Remove the entire card element
        event.target.closest('.card').remove();
    }
});
