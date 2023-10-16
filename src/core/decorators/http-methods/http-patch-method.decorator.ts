import { HttpMethods } from '../../enums';
import { httpMethodDecoratorFactory } from '../../http';

export const Patch = httpMethodDecoratorFactory(HttpMethods.Patch);
