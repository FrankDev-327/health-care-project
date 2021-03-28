'use strict';

const models = require('../models');
const jwt = require('jsonwebtoken');
const myKey = require('fs').readFileSync('../my_key.pub');

exports.auth_token = async (req, res) => {
	if (!req.headers.authorization)
		return res.status(403).json({
			message: 'The request does not have the authentication header'
		});

	try {
		var token = req.headers.authorization.replace(/['"]+/g, '');
		jwt.verify(token, myKey, (err, decoded) => {
			//var access_token
			console.log(decoded)
		});
	} catch (error) {
		return res.status(403).json({
			message: 'Token is not validate'
		});

	}
}