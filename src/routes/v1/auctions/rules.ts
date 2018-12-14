const joi = require('joi');

export const getRules = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  location: joi.string().required(),
  endTime: joi.string().required(),
});

export default joi
  .object({
    utility: joi
      .string()
      .valid(['ELECTRICITY', 'GAS'])
      .required(),
    type: joi
      .string()
      .valid(['consumption', 'cost', 'emission'])
      .required(),
    granularity: joi
      .string()
      .valid(['month', 'year'])
      .required(),
  })
  .required();
