window.addEventListener('load', () => {
    document.querySelector('#user').addEventListener('blur',updateRepros);
    document.querySelector('#submit').addEventListener('click',getReproEvents);
})

function updateRepros() {
    console.log('blur');
}

function getReproEvents() {
    console.log('click');
}