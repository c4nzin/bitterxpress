import { Application } from '../express-application';

describe('Application', () => {
  it('should return the same instance of Express', () => {
    const app1 = Application.getInstance();
    const app2 = Application.getInstance();

    expect(app1).toBe(app2);
  });
});
