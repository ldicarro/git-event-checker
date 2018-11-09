const githubEvents = angular.module('githubEvents',[]);

githubEvents.controller('githubEventsController',function githubEventsController($scope) {
    $scope.repos = [];
    $scope.repoObjs = []
    $scope.user = '';
    $scope.currentRepo = '';
    $scope.eventsObj = [];
    $scope.eventsMenu = [];
    $scope.currentEvent = '';

    $scope.getUserRepos = function() {

        fetch(`http://localhost:3000/users/${$scope.user}`)
            .then(res => res.json())
            .then((data) => { 
                document.querySelector('#repoList').classList.remove('disabled');
                $scope.repos = data; 

                data.forEach(el => {
                    let tempobj = {id: el.id, name: el.name};
                    $scope.repoObjs.push(tempobj);
                });

                $scope.$digest();
            })
            .catch((err) => { console.log('error')});
    }

    $scope.getRepoEvents = function() {

        let chosen = $scope.repos.find(el => { return el.id === $scope.currentRepo });

        console.log(chosen.name);
        fetch(`http://localhost:3000/repos/${$scope.user}/${chosen.name}/events`)
            .then(res => res.json())
            .then((data) => {
                document.querySelector('#eventList').classList.remove('disabled');

                $scope.eventsObj = data.map(el => {
                    return { type: el.type, actor: el.actor.display_login, date: el.created_at };
                })

                $scope.eventsMenu = $scope.eventsObj.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj['name']).indexOf(obj['name']) === pos;
                });

                $scope.$digest();
            })
            .catch((err) => { console.log('error') })
    }
});
