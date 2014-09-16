module.exports = sql = {
    create: {
        table: {
            emoticons: 'CREATE TABLE emoticons (id INTEGER PRIMARY KEY, name varchar(50) UNIQUE, description varchar(255))'
            , tags: 'CREATE TABLE tags (id INTEGER PRIMARY KEY, name varchar(50) UNIQUE)'
            , maps: 'CREATE TABLE maps (emoticon_id INTEGER, tag_id INTEGER)'
        }
    }
    , add: {
        emoticon: 'INSERT INTO emoticons (name) VALUES(?)'
        , tag: 'INSERT INTO tags (name) VALUES(?)'
        , map: 'INSERT INTO maps (emoticon_id,tag_id) VALUES(?,?)'
    }
    , get: {
        lastId: 'SELECT last_insert_rowid() AS id'
        , emoticon: 'SELECT * FROM emoticons WHERE id=? LIMIT 1'
        , emoticonByName: 'SELECT * FROM emoticons WHERE name=? LIMIT 1'
        , emoticons: 'SELECT * FROM emoticons ORDER BY id ASC'
        , tag: 'SELECT * FROM tags WHERE id=? LIMIT 1'
        , tagByName: 'SELECT * FROM tags WHERE name=? LIMIT 1'
        , tags: 'SELECT * FROM tags ORDER BY name ASC'
        , tagIdsByEmoticonId: 'SELECT tag_id FROM maps WHERE emoticon_id=? ORDER BY tag_id ASC'
        , mapsByEmoticonId: 'SELECT * FROM maps WHERE emoticon_id=? ORDER BY tag_id ASC'
        , maps: 'SELECT * FROM maps ORDER BY tag_id ASC'
        , map_id: 'SELECT t1.id AS emoticon_id' +
                ', t2.id AS tag_id ' +
                'FROM tags AS t2 ' +
                'INNER JOIN (' +
                'SELECT id AS emoticon_id ' +
                'FROM emoticons ' +
                'WHERE name=? ' +
                'LIMIT 1) AS t1 ' +
                'WHERE t2.name=? ' +
                'LIMIT 1'
    }
    , set: {
        //emoticon_name,tag_name
        tag: 'INSERT INTO maps (emoticon_id,tag_id) ' +
                'SELECT t1.id AS emoticon_id' +
                ', t2.id AS tag_id ' +
                'FROM tags AS t2 ' +
                'INNER JOIN (' +
                'SELECT id AS emoticon_id ' +
                'FROM emoticons ' +
                'WHERE name=? ' +
                'LIMIT 1) AS t1 ' +
                'WHERE t2.name=? ' +
                'LIMIT 1'
    }


}
