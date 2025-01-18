async function sendData(data) {
    try {
        const response = await fetch('http://127.0.0.1:8000/get-excel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("error");
        }

        // Handle the response as a Blob (for file downloads)
        const blob = await response.blob(); // Get the response as a Blob
        const url = window.URL.createObjectURL(blob); // Create a URL for the Blob
        
        const btn  = document.getElementById('d-button')
        // Create a temporary link to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'file.xlsx'; // Set the filename for the download
        btn.appendChild(a);
        a.click(); // Trigger the download
        // a.remove()

        // Clean up
        window.URL.revokeObjectURL(url); // Release the object URL
        btn.removeChild(a); // Remove the temporary link

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function main() {
    try {
        let currentUser = localStorage.getItem('currentUser');
        currentUser = JSON.parse(currentUser);

        // Send the currentUser data to the backend and trigger the download
        await sendData(currentUser);

    } catch (error) {
        console.error('Error:', error);
    }
    
}
document.getElementById('d-button').addEventListener('click', main, { once: true });

