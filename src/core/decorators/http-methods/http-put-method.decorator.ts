import { HttpMethods } from '../../enums';
import { httpMethodDecoratorFactory } from '../../http';

export const Put = httpMethodDecoratorFactory(HttpMethods.Put);
