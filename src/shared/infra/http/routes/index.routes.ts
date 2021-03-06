import { Router } from 'express';

import { carsRoutes } from './cars.routes';
import { usersRoutes } from './users.routes';
import { rentalsRoutes } from './rentals.routes';
import { passwordRoutes } from './password.routes';
import { categoriesRoutes } from './categories.routes';
import { autheticateRoutes } from './authenticate.routes';
import { specificationsRouter } from './specifications.routes';

const router = Router();

router.use(autheticateRoutes);
router.use('/cars', carsRoutes);
router.use('/users', usersRoutes);
router.use('/rentals', rentalsRoutes);
router.use('/password', passwordRoutes);
router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRouter);

export { router };
