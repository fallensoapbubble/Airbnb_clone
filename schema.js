const Joi = require('joi');

const listnSchma = Joi.object({
    listin : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        image: Joi.any(),
        price: Joi.number().required().min(0)
    }).required
})

module.exports=listnSchma


/*wrt this in app.js
      // schema validation
      const {listingSchema} = require('./schema.js')
      let result = listingSchema.validate(req.body)
      console.log(result)
*/