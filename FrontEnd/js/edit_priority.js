
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script is running');
    
    document.getElementById('create-project-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (1) {
            document.getElementById('submit_btn').style.display = 'none'
            const formData = {
                priority : document.getElementById('priority').value,
            };
            console.log(JSON.stringify(formData))
            
        }

    });
});
