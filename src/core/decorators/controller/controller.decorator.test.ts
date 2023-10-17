import 'reflect-metadata';
import { Controller } from './controller.decorator';
import { ControllerMetadataKey } from '../../enums';

describe('Controller Decorator', () => {
  it('should set the route metadata on the decorated class', () => {
    const expectedRoute = '/sample-route';

    @Controller(expectedRoute)
    class SampleController {}

    // Act
    const routeMetadata = Reflect.getMetadata(ControllerMetadataKey.ROUTE, SampleController);

    // Assert
    expect(routeMetadata).toBe(expectedRoute);
  });
});
