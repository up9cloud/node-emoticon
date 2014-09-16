angular.module('app.controllers')
        .controller('IndexCtrl', ['$scope', function ($scope) {
                $scope.url = {
                    header: ''
                    , footer: ''
                }
            }])
        .controller('AdminCtrl', ['$scope', '$http'
                    , function ($scope, $http) {
                        $scope.title = 'Admin tool'
                        $scope.req = {}
                        $scope.emoticons;
                        $scope.tags;
                        //api methods
                        $scope.update = function () {
                            $scope.get.emoticons();
                            $scope.get.tags();
                        }
                        $scope.get = {
                            emoticon: function (emoticon_id) {
                                $http.get('api/emoticon/' + emoticon_id)
                                        .success(function (data) {
                                            $scope.res = data;
                                        })
                                        .error(function () {

                                        })
                            }
                            , emoticons: function () {
                                $http.get('api/emoticons')
                                        .success(function (data) {
                                            $scope.emoticons = data;
                                        })
                                        .error(function () {

                                        })
                            }
                            , tags: function () {
                                $http.get('api/tags')
                                        .success(function (data) {
                                            $scope.tags = data;
                                        })
                                        .error(function () {

                                        })
                            }
                            , tagsByEmoticonId: function (tagIds) {
                                var tags = [];
                                if ($scope.tags) {
                                    tagIds.forEach(function (val) {
                                        tags.push($scope.tags[val - 1].name)
                                    })
                                }
                                return tags;
                            }
                        }
                        $scope.add = {
                            emoticon: function () {
                                $http.post('api/emoticon', $scope.req)
                                        .success(function (data) {
                                            $scope.res = data;
                                            $scope.update();
                                        })
                                        .error(function () {

                                        })
                            }
                            , tag: function () {
                                $http.post('api/tag', $scope.req)
                                        .success(function (data) {
                                            $scope.res = data;
                                            $scope.update();
                                        })
                                        .error(function () {

                                        })
                            }
                            , map: function () {
                                $http.post('api/map', $scope.req)
                                        .success(function (data) {
                                            $scope.res = data;
                                            $scope.update();
                                        })
                                        .error(function () {

                                        })
                            }
                        }
                        //init
                        $scope.update();
                    }])

