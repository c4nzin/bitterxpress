import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { RegisterMiddlewares } from '../middleware-decorator';
import { USE_MIDDLEWARES_METADATA } from '../../../constants/middlewares-constants';

describe('RegisterMiddlewares', () => {
  it('should set middlewares metadata on the decorated class and method', () => {
    // Arrange
    const exampleMiddleware1 = (req: Request, res: Response, next: NextFunction) => {
      next();
    };

    const exampleMiddleware2 = (req: Request, res: Response, next: NextFunction) => {
      next();
    };

    @RegisterMiddlewares(exampleMiddleware1, exampleMiddleware2)
    class TestController {
      @RegisterMiddlewares(exampleMiddleware1)
      public sampleMethod(req: Request, res: Response) {}
    }

    // Act
    const classMiddlewares = Reflect.getMetadata(USE_MIDDLEWARES_METADATA, TestController);
    const methodMiddlewares = Reflect.getMetadata(
      USE_MIDDLEWARES_METADATA,
      TestController.prototype,
      'sampleMethod',
    );

    // Assert
    expect(classMiddlewares).toEqual([exampleMiddleware1, exampleMiddleware2]);
    expect(methodMiddlewares).toEqual([exampleMiddleware1]);
  });
});
