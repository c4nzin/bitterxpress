import { ILogger } from '../../core/interfaces/logger.interface';
import pino from 'pino';

const logger = pino();

export class Logger implements ILogger {
  log(message: string) {
    logger.info(message);
  }
  error(message: string) {
    logger.error(message);
  }
  warning(message: string) {
    logger.warn(message);
  }
  info(message: string) {
    logger.info(message);
  }
}
