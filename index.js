window.addEventListener('load', () => {
    document.querySelector('#user').addEventListener('blur',(evt) => updateRepros(evt));
    document.querySelector('#submit').addEventListener('click',(evt) => getReproEvents(evt));
})

function updateRepros(evt) {
    const url = `https://api.github.com/users/${evt.target.value}/repos`;

    fetch(url) 
        .then((res) => res.json())
        .then((data) => {

            if(data.length > 0)
            {
                let select = document.querySelector('#repros');
                select.innerHTML = '';
                data.forEach((el) => {
                    var tempEl = document.createElement('option');
                    tempEl.innerText = el.name;
                    tempEl.value = el.events_url;
                    console.log(el);
                    select.appendChild(tempEl);
                })

                select.removeAttribute('disabled');
            }
            else
            {
                // display error
            }
        })

}

function getReproEvents(e) {
    console.log('click');
}