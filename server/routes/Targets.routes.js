import { Router } from 'express';
import * as TargetsController from '../controllers/Targets.controller.js';

const router = new Router();

router.route('/fetchTargets').get(TargetsController.fetchTargets);
router.route('/updateTarget').post(TargetsController.updateTarget);


export default router;
