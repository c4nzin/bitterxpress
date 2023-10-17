import 'reflect-metadata';
import { ApplyCustomResponseHeaders } from '../apply-custom-response-headers.decorator';
import { ResponseHeadersMetadataKey } from '../../enums';

describe('ApplyCustomResponseHeaders', () => {
  it('should set response headers metadata on the decorated class and method', () => {
    // Arrange
    const customHeaders = {
      Header1: 'Value1',
      Header2: 'Value2',
    };

    @ApplyCustomResponseHeaders(customHeaders)
    class TestController {
      @ApplyCustomResponseHeaders({ Header3: 'Value3' })
      public sampleMethod() {}
    }

    // Act
    const classHeaders = Reflect.getMetadata(ResponseHeadersMetadataKey.HEADERS, TestController);
    const methodHeaders = Reflect.getMetadata(
      ResponseHeadersMetadataKey.HEADERS,
      TestController.prototype,
      'sampleMethod',
    );

    // Assert
    expect(classHeaders).toEqual(customHeaders);
    expect(methodHeaders).toEqual({ Header3: 'Value3' });
  });
});
