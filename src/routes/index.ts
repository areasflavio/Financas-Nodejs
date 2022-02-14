import { Router } from 'express';

import transactionsRouter from './transaction.routes';
import categoriesRouter from './category.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);
routes.use('/categories', categoriesRouter);

export default routes;
