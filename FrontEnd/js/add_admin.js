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

async function sendData(data) {
    try {
        const response = await fetch('http://127.0.0.1:8000/add-admin', {
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

// Add click event listener to all buttons
document.addEventListener('click', async function(event) {
    if (event.target.classList.contains('remove-btn')) { 
        const data = {
            email: event.target.getAttribute('data-name'),
        };

        try {
            const result = await sendData(data);
            if(result.is_succes == 'true'){    
                console.log('added')
            }else{
                alert(result.detail)
            }
        } catch (error) {
            console.error('Error:', error);
        }
        event.target.closest('.card').remove();
    }
});