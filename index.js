window.addEventListener('load', () => {
    document.querySelector('#user').addEventListener('blur',(evt) => updateRepros(evt));
    document.querySelector('#repros').addEventListener('change',(evt) => getReproEvents(evt));
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

function getReproEvents(evt) {
    console.log(evt.target.value);
    fetch(evt.target.value)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            data.forEach((el) => {
                let str = `<span>${el.type}</span><span>${el.actor.display_login}</span><span>${el.created_at}</span>`;
                const row = document.createElement('div');
                row.innerHTML = str;
                document.querySelector('#results').appendChild(row);
            })
        })
        .catch((err) => {
            console.log(`err: ${err}`)
        })
}