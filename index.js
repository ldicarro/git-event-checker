window.addEventListener('load', () => {
    document.querySelector('#user').addEventListener('blur',(evt) => updateRepros(evt));
    document.querySelector('#repros').addEventListener('change',(evt) => getReproEvents(evt));
})

function updateRepros(evt) {
    const userError = document.querySelector('#user-error');
    const select = document.querySelector('#repros');

    userError.innerText = '';
    select.parentElement.classList.add('disabled');
    select.innerHTML = '<option>Select</option>';
    document.querySelector('#results').innerHTML = '';

    const url = `https://api.github.com/users/${evt.target.value}/repos`;

    fetch(url) 
        .then((res) => {
            if(res.status === 200) {
                return res.json();
            }
            else {
                userError.innerText = "User not found.";
            }
        })
        .then((data) => {

            if(data.length > 0)
            {
                select.innerHTML = '';
                data.forEach((el) => {
                    var tempEl = document.createElement('option');
                    tempEl.innerText = el.name;
                    tempEl.value = el.events_url;
                    select.appendChild(tempEl);
                })

                select.parentElement.classList.remove('disabled');
            }
            else
            {
                
            }
        })
        .catch((err) => console.log(err))

}

function getReproEvents(evt) {
    fetch(evt.target.value)
        .then((res) => res.json())
        .then((data) => {
            const results = document.querySelector('#results');
            results.innerHTML = '';
            if(data.length > 0)
            {
                data.forEach((el) => {
                    const evnt = document.createElement('span');
                    evnt.innerText = el.type;

                    const user = document.createElement('a');
                    user.innerText = el.actor.display_login;
                    user.setAttribute('href',el.actor.url);
                    
                    const date = document.createElement('span');
                    date.innerText = el.created_at;

                    const row = document.createElement('div');
                    row.className = 'results-row';
                    row.appendChild(evnt);
                    row.appendChild(user);
                    row.appendChild(date);
                    
                    results.appendChild(row);
                })
            }
            else
            {
                results.innerHTML = `<div class="results-row">No events found</div>`;
            }
        })
        .catch((err) => {
            console.log(`err: ${err}`)
        })
}