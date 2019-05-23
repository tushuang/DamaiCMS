import express from 'express';
import order from './order';
import usersRouter from './users';
import login from './login';
import register from './register';

const router = (app) => {
  app.use('/order', order);
  app.use('/users', usersRouter);
  app.use('/login', login);
  app.use('/register', register);
};

export default router;
