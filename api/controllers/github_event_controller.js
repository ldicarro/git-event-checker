'use strict';

const fetch = require('node-fetch');

exports.getUserRepos = (req,resp) => {
    console.log('getuserrepos');
    const user = req.params.user;
    const url = `https://api.github.com/users/${user}/repos`;

    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            else {
                resp.status(404);
                resp.send([
                    {
                        'status': 'Error',
                        'message': 'User not found.'
                    }
                ])
            }
        })
        .then((data) => {
            if (data.length > 0) {
                resp.status(200);
                resp.send(data);
            }
            else {
                resp.send("No repos.")
            }
        })
        .catch((err) => {
            console.log(err);
            resp.status(404);
            resp.send(err);
        });
}

exports.getRepoEvents = (req,resp) => {
    console.log('getrepoevents');
    const user = req.params.user;
    const repo = req.params.repo;

    const url = `https://api.github.com/repos/${user}/${repo}/events`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if(data.length > 0) {
                resp.status(200);
                resp.send(data);
            } else {
                resp.status(200);
                resp.send([
                    {
                        'status': 'Error',
                        'message': 'No Results'
                    }
                ])
            }
        })
}

exports.getSortedRepoEvents = (req,resp) => {
    console.log('getsortedrepoevents');
    const user = req.params.user;
    const repo = req.params.repo;
    const event = req.params.event;

    const url = `https://api.github.com/repos/${user}/${repo}/events`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (data.length > 0) {

                const filtered = data.filter(el => el.type === event);

                resp.status(200);
                resp.send(filtered);
            } else {
                resp.status(200);
                resp.send([
                    {
                        'status': 'Error',
                        'message': 'No Results'
                    }
                ])
            }
        })
}