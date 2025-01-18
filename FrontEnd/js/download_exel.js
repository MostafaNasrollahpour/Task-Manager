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
        

        // const result = await sendData(currentUser); 
        // console.log(result)

    } catch (error) {
        console.error('Error:', error);
    }
}


document.getElementById('d-button').addEventListener('click', main);

