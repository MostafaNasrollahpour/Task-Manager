function checkInputs() {
    const input = document.querySelector('input');
    let allValid = true;

    if(input.value.trim() === ""){
        allValid = false
        input.style.border = '2px solid red'
    }

    if (!allValid) {
        alert("Please fill out field.");
        return false;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script is running');
    
    document.getElementById('create-project-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (checkInputs()) {
            document.getElementById('submit_btn').style.display = 'none'
            const formData = {
                start_date: document.getElementById('project_start_date').value,
            };
            console.log(JSON.stringify(formData))
            
        }

    });
});
