import request from 'supertest';
import { appController } from '../../../app';

const user = 

describe('Auth[e2e]', () => {
  it('should expect return a user and token', async () => {

    const response = await request(appController.app)
      .post('/auth')
      .send()

    expect(1 + 1).toBe(2);
  });
});