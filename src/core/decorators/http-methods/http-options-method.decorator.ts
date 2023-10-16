import { HttpMethods } from '../../enums';
import { httpMethodDecoratorFactory } from '../../http';

export const Options = httpMethodDecoratorFactory(HttpMethods.Options);
