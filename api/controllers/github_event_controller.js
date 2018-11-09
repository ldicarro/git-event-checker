'use strict';

const fetch = require('node-fetch');

exports.getUserRepos = (req,resp) => {
    const user = req.params.user;
    const url = `https://api.github.com/users/${user}/repos`;

    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            else {
                resp.send("User not found.");
            }
        })
        .then((data) => {
            console.log(data);
            if (data.length > 0) {
                resp.send(data);
            }
            else {
                resp.send("No repos.")
            }
        })
        .catch((err) => {
            console.log(err);
            resp.send(err);
        });
}