import { HttpMethods } from '../../enums';
import { httpMethodDecoratorFactory } from '../../http';

export const Trace = httpMethodDecoratorFactory(HttpMethods.Trace);
