const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/user');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/loginCrud');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users/signup')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get a user by id', async () => {
    const user = await User.findOne({ username: 'testuser' });
    const res = await request(app)
      .get(`/api/users/${user._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });

  it('should update a user by id', async () => {
    const user = await User.findOne({ username: 'testuser' });
    const res = await request(app)
      .put(`/api/users/${user._id}`)
      .send({
        username: 'updateduser'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toEqual('updateduser');
  });

  it('should delete a user by id', async () => {
    const user = await User.findOne({ username: 'updateduser' });
    const res = await request(app)
      .delete(`/api/users/${user._id}`);
    expect(res.statusCode).toEqual(200);
  });
});
