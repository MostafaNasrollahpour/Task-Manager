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

    const items = data; 

    console.log(items.users[0].name); 
}

useFetchedData();





// items.forEach(item => {
//     const div = document.createElement('div');
//     div.className = 'card';
    
//     // Create the card content
//     const cardContent = `
//         <div>
//             <h5 class="for-admin">${item}</h5>
//             <div class="d-flex justify-content-end">
//                 <button type="button" class="remove-btn btn btn-success" style="border:none;" data-name="${item}">Add</button>
//             </div>
//         </div>
//     `;
    
//     div.innerHTML = cardContent;
    
//     container.appendChild(div);
// });

// // Add click event listener to all buttons
// document.addEventListener('click', function(event) {
//     if (event.target.classList.contains('remove-btn')) {
//         console.log(`Name added: ${event.target.getAttribute('data-name')}`);
        
//         // Remove the entire card element
//         event.target.closest('.card').remove();
//     }
// });
