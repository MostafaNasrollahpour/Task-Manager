const x = JSON.stringify('raziyeh')

const items = [JSON.parse(x),x, 'mostafa' , 'nfs' , 'mahtab'];

const container = document.getElementById('container');

items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.textContent = item;
    container.appendChild(div);
});