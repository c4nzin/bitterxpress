import { HttpMethods } from '../../enums';
import { httpMethodDecoratorFactory } from '../../http';

export const Post = httpMethodDecoratorFactory(HttpMethods.Post);
