var express = require('express');
var router = express.Router();
var config = require(__dirname + '/../package.json');

router.get('/', function (req, res) {
    res.render('index.html', {
        noscript: '您必須要允許JavaScript，才可瀏覽此網頁...'
        , title: config.name
        , lang: "en"
        , lisence: config.lisence
        , app: {
            name: config.name
        }
        , meta: {
            robots: ""
            , description: config.description
            , keywords: config.keywords
            , author: config.author
            , fragment: "!"
        }
        , url: {
            icon: ""
            , js: {
                angular: {
                    main: "//ajax.googleapis.com/ajax/libs/angularjs/1.3.0-rc.1/angular.min.js"
                    , route: "//ajax.googleapis.com/ajax/libs/angularjs/1.3.0-rc.1/angular-route.min.js"
                }
                , app: "js/app.min.js"
            }
            , css: {
                bootstrap: "css/bootstrap.min.css"
                , app: "css/app.min.css"
            }
        }
    });
})

module.exports = router;
