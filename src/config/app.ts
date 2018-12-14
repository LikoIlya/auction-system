import * as dotenv from 'dotenv';
import * as joi from 'joi';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .allow(['development', 'production', 'test', 'provision'])
      .default('development'),
    API_PORT: joi.number().default(8080),
    DB_HOST: joi
      .string()
      .required()
      .description('Postgres Hostname'),
    DB_NAME: joi
      .string()
      .required()
      .description('Postgres Database Name'),
    DB_USER: joi
      .string()
      .required()
      .description('Postgres Username'),
    DB_PASSWORD: joi
      .string()
      .required()
      .description('Postgres Password'),
    DB_PORT: joi
      .number()
      .default(5432)
      .description('Postgres Port'),
    REDIS_HOST: joi
      .string()
      .required()
      .description('Redis Hostname'),
    REDIS_PORT: joi
      .number()
      .default(6379)
      .description('Redis Port'),
    JWT_SECRET: joi
      .string()
      .required()
      .description('Secret for JSON Web Token'),
  })
  .unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema, {
  abortEarly: false,
});
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export { envVars };
