import Joi from 'joi';

export const configValidationSchema = Joi.object({
  API_PORT: Joi.number().default(3900).required(),
  API_PREFIX: Joi.string().required(),
  API_VERSION: Joi.string().required(),
  // STAGE: Joi.string().required(),
  UPLOAD_PATH: Joi.string().required(),
  MAX_FILE_SIZE: Joi.number().required(),
  MAX_FILE_COUNTS: Joi.number().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRES: Joi.number().required(),
  JWT_REFRESH_TOKEN_EXPIRES: Joi.number().required(),
  // TWILIO_ACCOUNT_SID: Joi.string().required(),
  // TWILIO_AUTH_TOKEN: Joi.string().required(),
});
