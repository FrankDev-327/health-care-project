'use strict';

const { encode } = require('../../auths/index')
const bcrypt = require('bcryptjs-then')
const models = require('../../models');
const aux_methods = require('../../aux_methods/aux')

module.exports = {
    create_admin: async (req, res) => {
        var body = req.body, info;
        var check_pass = aux_methods.checkPassword(body.password)

        if (!check_pass.IsNot) {
            return res.status(401).json({
                msg: check_pass.msg
            });
        }

        body.password = await aux_methods.hashPass(body.password);
        body.create_by = req.log_user.id;
        body.update_by = req.log_user.id;
        try {
            info = await models.HeatlhAdministration.create(body);
        } catch (error) {
            return res.status(401).json({
                msg: 'There was a error on the insert to the new admin/user.'
            });
        }

        if (info !== null) {
            return res.status(200).json({
                info,
                msg: 'New admin/user was created successfuly!'
            });
        }

        return res.status(200).json({
            msg: 'New admin/user was not created correctly!'
        });
    },
    update_pass_by_admin: async (req, res) => {
        var role = req.log_user.role;
        if (role !== 1) {
            return res.status(401).json({
                msg: 'You have not allowed to do this action!'
            });
        }

        var body = req.body;
        var check_pass = aux_methods.checkPassword(body.password);
        if (!check_pass.IsNot) {
            return res.status(401).json({
                msg: check_pass.msg
            });
        }

        body.password = await aux_methods.hashPass(body.password);
        var setBody = {
            update_by: req.log_user.id,
            password: body.password
        };
        var setWhere = {
            no_id: body.no_id,
            id: body.id
        }

        try {
            var info = await models.HeatlhAdministration.update(setBody, setWhere);
        } catch (error) {
            return res.status(401).json({
                msg: 'There was a error when you were trying to update it.'
            });
        }


        if (info == null) {
            return res.status(200).json({
                msg: 'The password was not updated correctly!'
            });
        }

        return res.status(200).json({
            info,
            msg: 'The password was updated successfuly!'
        });
    },
    change_role_by_admin: async (req, res) => {
        var role = req.log_user.role;
        if (role !== 1) {
            return res.status(401).json({
                msg: 'You have not allowed to do this action!'
            });
        }
        var body = req.body;
        var setBody = {
            update_by: req.log_user.id,
            role: body.role
        };
        var setWhere = {
            no_id: body.no_id,
            id: body.id
        }
        try {
            var info = await models.HeatlhAdministration.update(setBody, setWhere);
        } catch (error) {
            return res.status(401).json({
                msg: 'There was a error when you were trying to update it.'
            });
        }
        return res.status(200).json({
            info,
            msg: 'The role was updated successfuly!'
        });
    },
    login_admin: async (req, res) => {
        try {
            var info;
            var body = req.body;
            var check_pass = aux_methods.checkPassword(body.password);
            if (!check_pass.IsNot) {
                return res.status(401).json({
                    msg: check_pass.msg
                });
            }
            var setFind = {
                where: {
                    name: body.name
                }
            }

            info = await models.HeatlhAdministration.findOne(setFind);
            if (info == null) {
                return res.status(401).json({
                    info,
                    msg: 'User not exist in our registers!'
                });
            }

            var checkPass = await compareHashPass(info.password, body.password);
            if (!checkPass) {
                return res.status(401).json({
                    info,
                    msg: 'Incorrect password! Try again.'
                });
            }

            var token = await encode.create_token(info);
            return res.status(200).json({
                info,
                token: token,
                msg: 'User information.'
            });

        } catch (error) {
            return res.status(401).json({
                msg: 'There was a error.'
            });
        }
    }
}

