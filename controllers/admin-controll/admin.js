'use strict';

const bcrypt = require('bcryptjs-then')
const models = require('../../models');

function checkPassword(str) {
    // at least one number, one lowercase and one uppercase letter
    // at least six characters that are letters, numbers or the underscore
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
    var auth_pass = re.test(str);
    if (!auth_pass) {
        return {
            IsNot: false,
            msg: 'Format password is not allowed.'
        }
    }
    return true;
}

async function hashPass(user_pass) {
    try {
        return bcrypt.hash(user_pass, 10);
    } catch (error) {
        console.log(error)
        return;
    }
}

async function compareHashPass(hash, pass) {
    try {
        return bcrypt.compare(hash, pass);
    } catch (error) {
        console.log(error)
        return;
    }
}

module.exports = {
    create_admin: async (req, res) => {
        var body = req.body;
        var check_pass = checkPassword(body.password);
        if (!check_pass.IsNot) {
            return res.status(401).json({
                msg: check_pass.msg
            });
        }
        body.password = await hashPass(body.password);
        body.create_by = req.log_user.id;
        body.update_by = req.log_user.id;
        try {
            await models.HeatlhAdministration.create(body);
        } catch (error) {
            return res.status(401).json({
                msg: 'There was a error on the insert to the new admin/user.'
            });
        }
        return res.status(200).json({
            info,
            msg: 'New admin/user was created successfuly!'
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
        var check_pass = checkPassword(body.password);
        if (!check_pass.IsNot) {
            return res.status(401).json({
                msg: check_pass.msg
            });
        }
        body.password = await hashPass(body.password);
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
        return res.status(200).json({
            info,
            msg: 'Admin/user was updated successfuly!'
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
            msg: 'Admin/user was updated successfuly!'
        });
    },
    login_admin: async (req, res) => {
        try {
            var info;
            var body = req.body;
            var check_pass = checkPassword(body.password);
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
            if (info) {
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
            return res.status(200).json({
                info,
                msg: 'User informationss.'
            });

        } catch (error) {
            return res.status(401).json({
                msg: 'There was a error when you were trying to update it.'
            });
        }
    }
}

