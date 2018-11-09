'use strict';

module.exports = function(app) {
    const ghEvents = require('../controllers/github_event_controller');

    app.route('/users/:user')
        .get(ghEvents.getUserRepos);

    app.route('/repos/:user/:repo/events')
        .get(ghEvents.getRepoEvents);
}