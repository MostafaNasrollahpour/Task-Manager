// function checkInputs() {
//     const inputs = document.querySelectorAll('.in');
//     let allValid = true;

//     inputs.forEach(input => {
//         if (input.value.trim() === "") {
//             allValid = false;
//             input.style.border = "2px solid red";
//         } else {
//             input.style.border = "1px solid #ccc";
//         }
//     });

//     if (!allValid) {
//         alert("Please fill out all fields.");
//         return false;
//     }

//     return true;
// }

// document.addEventListener('DOMContentLoaded', function() {
//     console.log('Script is running');
    
//     document.getElementById('create-project-form').addEventListener('submit', async function(e) {
//         e.preventDefault();
        
//         if (checkInputs()) {
//             document.getElementById('submit_btn').style.display = 'none'
//             const formData = {
//                 project_name: document.getElementById('project_name').value,
//                 start_date: document.getElementById('start_date').value,
//                 end_date: document.getElementById('end_date').value,
//                 description: document.getElementById('description').value,
//                 manager: document.getElementById('manager').value.toLowerCase(),
//                 receiver: document.getElementById('receiver').value.toLowerCase(),
//                 priority: document.getElementById('priority').value
//             };
//             console.log(JSON.stringify(formData))
            
//         }

//     });
// });

const x= {
    project_name : 'data strucrure',
    start_date : '2025-01-01',
    end_date : '2026-01-01',
    description : 'none',
    manager : 'me',
    receiver : 'you',
    priority : 'whenever you can'
}

document.getElementById('demo-name').innerHTML = x['project_name']
document.getElementById('demo-start-date').innerHTML = x['start_date']
document.getElementById('demo-end-date').innerHTML = x['end_date']
document.getElementById('demo-description').innerHTML = x['description']
document.getElementById('demo-manager').innerHTML = x['manager']
document.getElementById('demo-name').innerHTML = x['project_name']
document.getElementById('demo-priority').innerHTML = x['priority']







