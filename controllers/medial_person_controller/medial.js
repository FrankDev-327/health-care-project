'use strict';

const bcrypt = require('bcryptjs-then')
const model = require('../../models')
const aux_methods = require('../../aux_methods/aux');


module.exports = {
    create_medial_source: async (req, res) => {
        var body = req.body, info;
        var check_pass = aux_methods.checkPassword(body.pass)

        if (!check_pass.IsNot) {
            return res.status(401).json({
                msg: check_pass.msg
            });
        }

        body.password = await aux_methods.hashPass(body.pass);
        body.created_by = req.log_user.id;
        body.updated_by = req.log_user.id;

        try {
            info = await models.MedialPersonal.create(body);
        } catch (error) {
            return res.status(401).json({
                msg: 'There was a error on the insert to the new admin/user.'
            });
        }

        if (info !== null) {
            return res.status(200).json({
                info,
                msg: 'New medical person was created successfuly!'
            });
        }

        return res.status(200).json({
            msg: 'New medical person was not created correctly!'
        })
    },
    update_pass_medial_person: async (req, res) => {
        var role = req.log_user.role;
        if (role !== 1) {
            return res.status(401).json({
                msg: 'You have not allowed to do this action!'
            });
        }

        var body = req.body;
        var check_pass = aux_methods.checkPassword(body.pass);
        if (!check_pass.IsNot) {
            return res.status(401).json({
                msg: check_pass.msg
            });
        }

        body.password = await aux_methods.hashPass(body.pass);
        var setBody = {
            update_by: req.log_user.id,
            password: body.password
        };

        var setWhere = {
            no_id: body.id_card,
            id: body.id
        }

        try {
            var info = await models.MedialPersonal.update(setBody, setWhere);
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

    }

}