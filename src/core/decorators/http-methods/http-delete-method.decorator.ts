import { HttpMethods } from '../../enums';
import { httpMethodDecoratorFactory } from '../../http';

export const Delete = httpMethodDecoratorFactory(HttpMethods.Delete);
