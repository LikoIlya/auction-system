import * as fs from 'fs-extra';
import * as path from 'path';
import * as winston from 'winston';

const baseDir = path.join(__dirname, '../../../logs');

fs.ensureDirSync(baseDir);

export const logger = winston.createLogger({
  format: winston.format.json(),
  level: 'info',
  transports: [
    new winston.transports.File({
      filename: path.join(baseDir, 'error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(baseDir, 'combined.log'),
    }),
  ],
});
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
export const accessLogStream = fs.createWriteStream(
  path.join(baseDir, 'access.log'),
  {
    flags: 'a',
  }
);
