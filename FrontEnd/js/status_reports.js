const x = JSON.stringify('raziyeh');

const items = [JSON.parse(x), x, 'mostafa','yousef', 'mahtab', 'fgjhfog'];


items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <div class="card-content">
            <h3>${item}</h3>
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
