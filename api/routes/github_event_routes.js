'use strict';

module.exports = function(app) {
    const ghEvents = require('../controllers/github_event_controller');

    app.route('/users/:user')
        .get(ghEvents.getUserRepos);

    //app.route('/tasks/:taskId')
    //    .get(ghEvents.read_a_task)
    //    .post(ghEvents.update_a_task);
}