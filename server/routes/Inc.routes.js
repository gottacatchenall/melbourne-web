import { Router } from 'express';
import * as IncController from '../controllers/Inc.controller.js';

const router = new Router();

router.route('/getIncData/:num').get(IncController.getIncData);
router.route('/fetchIncData').get(IncController.fetchIncData);

export default router;
