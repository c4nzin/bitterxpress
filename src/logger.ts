import { ILogger } from './core/interfaces/logger.interface';

export class Logger implements ILogger {
  log(message: string) {
    console.log(message);
  }
  error(message: string) {
    console.error(message);
  }
  warning(message: string) {
    console.warn(message);
  }
  info(message: string) {
    console.info(message);
  }
}
