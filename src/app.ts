import express from 'express';
import cors from 'cors';
import logger from 'morgan';

import { router as stutendRouter } from '@students/routers/studentRouter.js';
import { router as professorRouter } from '@professors/routers/professorRouter.js';
import { router as itemRouter } from '@items/routers/itemRouter.js';
import { router as itemTypeRouter } from '@itemTypes/routers/itemTypeRouter.js';
import { router as itemCategoryRouter } from '@itemCategories/routers/itemCategoryRouter.js';

export const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/students', stutendRouter);
app.use('/api/professors', professorRouter);
app.use('/api/items', itemRouter);
app.use('/api/types', itemTypeRouter);
app.use('/api/categories', itemCategoryRouter);
