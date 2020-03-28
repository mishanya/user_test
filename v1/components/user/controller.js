const Joi = require('joi');
const User = require(process.cwd() + "/models/index").User;
const config = require('config');
const errorToJSON = require('@errorToJSON');

module.exports = async (req, res) => {

    const { error } = validate(req.query);

    if (error) return errorToJSON(res, 400, error.details[0].message)

    return await User
        .findAll({
            where: {
              first_name: {
                $ilike: `%${req.query.first_name}%`
              },
              last_name:{
                $ilike: `%${req.query.last_name}%`
              }
            }
        })
        .then(users => users.length > 0 ? res.json({
            status: {
                code: 200
            },
            response: users
        }) : errorToJSON(res, 404, 'Users not found'))
        .catch(err => console.log(err) || errorToJSON(res, 500, 'Internal server error', err.toString()))

};

function validate(query) {
    const schema = Joi.object().keys({
        first_name: Joi.string().allow(''),
        last_name: Joi.string().allow('')
    }).required();

    return Joi.validate(query, schema);
}