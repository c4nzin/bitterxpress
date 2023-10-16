import { HttpMethods } from '../../enums';
import { httpMethodDecoratorFactory } from '../../http';

export const Get = httpMethodDecoratorFactory(HttpMethods.Get);
