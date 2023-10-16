import { HttpMethods } from '../../enums';
import { httpMethodDecoratorFactory } from '../../http';

export const Connect = httpMethodDecoratorFactory(HttpMethods.Connect);
