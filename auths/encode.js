'use strict';

var jwt = require('jsonwebtoken');
var myKey = require('fs').readFileSync('../my_key.key')
exports.create_token = async (obj_user) => {
    var payload = {
        id: obj_user.id,
        name: obj_user.name,
        lastname: obj_user.lastname,
        no_id: obj_user.no_id,
        role: obj_user.role,
    }
    return jwt.sign(payload, myKey, { algorithm: 'RS256' });
}