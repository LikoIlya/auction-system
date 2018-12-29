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
    DATABASE_URL: joi.
      string()
      .description('Postgres for Heroku'),
    DB_HOST: joi
      .string()
      .description('Postgres Hostname'),
    DB_NAME: joi
      .string()
      .description('Postgres Database Name'),
    DB_USER: joi
      .string()
      .description('Postgres Username'),
    DB_PASSWORD: joi
      .string()
      .description('Postgres Password'),
    DB_PORT: joi
      .number()
      .default(5432)
      .description('Postgres Port'),
    REDIS_URL: joi
      .string()
      .description('Redis url'),
    JWT_SECRET: joi
      .string()
      .default('my_super_secret')
      .description('Secret for JSON Web Token'),
  })
  .unknown();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema, {
  abortEarly: false,
});
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export { envVars };
