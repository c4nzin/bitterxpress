import { HttpMethods } from '../../enums';
import { httpMethodDecoratorFactory } from '../../http';

export const Head = httpMethodDecoratorFactory(HttpMethods.Head);
