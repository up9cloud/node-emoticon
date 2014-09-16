var debug = require('debug')('api');
var express = require('express');
var router = express.Router();

var fs = require("fs");
var dbFile = __dirname + '/../database.db';
var isNoDb = false;

if (!fs.existsSync(dbFile)) {
    debug('create db file.');
    fs.openSync(dbFile, 'w');
    isNoDb = true;
}

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(dbFile);
var sql = require(__dirname + '/sql.js');

if (isNoDb) {
    db.serialize(function () {
        debug('create db tables.');
        db.run(sql.create.table.emoticons);
        db.run(sql.create.table.tags);
        db.run(sql.create.table.maps);
    });
}

router.get('/emoticons', function (req, res) {
    db.serialize(function () {
        var emoticons;
        var output = [];
        db.all(sql.get.emoticons, [], function (err, rows) {
            debug('get all raw emoticons')
            emoticons = rows
            var stmt = db.prepare(sql.get.tagIdsByEmoticonId);
            emoticons.forEach(function (emoticon) {
                stmt.all([emoticon.id], function (err, rows) {
                    debug('get tagIdsByEmoticonId')
                    var tagIds = [];
                    rows.forEach(function (row) {
                        tagIds.push(row.tag_id)
                    });
                    output.push({
                        id: emoticon.id
                        , name: emoticon.name
                        , description: emoticon.description
                        , tagIds: tagIds
                    })
                });
            })
            stmt.finalize(function () {
                debug('send all emoticons')
                res.json(output);
            });
        })
    });
});
router.get('/tags', function (req, res) {
    db.serialize(function () {
        db.all(sql.get.tags, [], function (err, rows) {
            debug('send all tags: ' + rows)
            res.json(rows);
        })
    });
});

router.post('/emoticon', function (req, res) {
    var emoticonId;
    var name = req.body.emoticon_name;
    var tagIds = req.body.tagIds;
    db.serialize(function () {
        db.run(sql.add.emoticon, [name], function (err) {
            if (err) {
                debug(err)
                res.status(400)
                res.json(err)
            }
        });
        db.get(sql.get.lastId, function (err, row) {
            emoticonId = row.id
        })
        if (tagIds) {
            tagIds.forEach(function (tagId) {
                db.run(sql.add.map, [emoticonId, tagId], function (err) {
                    if (err) {
                        debug(err)
                        res.status(400)
                        res.json(err)
                    }
                });
            })
        }
        debug('send lastId: ' + emoticon.id)
        res.status(201)
        res.json(emoticon);
    });
});
router.post('/tag', function (req, res) {
    var name = req.body.tag_name;
    db.serialize(function () {
        db.run(sql.add.tag, [name], function (err) {
            if (err) {
                debug(err)
                res.status(400)
                res.json(err)
            }
        });
        db.get(sql.get.lastId, function (err, row) {
            debug('send lastId: ' + row)
            res.status(201)
            res.json(row);
        })
    });
});
router.post('/map', function (req, res) {
    var emoticonId = req.body.emoticonId;
    var tagId = req.body.tagId;
    db.serialize(function () {
        db.run(sql.add.map, [emoticonId, tagId], function (err) {
            if (err) {
                debug(err)
                res.status(400)
                res.json(err)
            }
        });
        db.get(sql.get.lastId, function (err, row) {
            debug('send lastId: ' + row)
            res.status(201)
            res.json(row);
        })
    });
});

module.exports = router;
