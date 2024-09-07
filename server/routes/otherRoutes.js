import express from "express";
import {
  contact,
  courseRequest,
  getDashboardStats
} from "../controllers/otherControllers.js";

import { authorizeAdmin, isAuthenticated } from '../middlewars/auth.js';

const router = express.Router();

// // contact form
router.post('/contact', contact)

// // Request form
router.post('/courserequest', courseRequest)

// // Get Admin Dashboard Stats
router.get('/admin/stats',isAuthenticated, authorizeAdmin, getDashboardStats)

export default router;