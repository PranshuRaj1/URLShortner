import express from "express";
import shortUrl from "../controllers/url.js";
import { handleGetAnalytics } from "../controllers/url.js";
const router = express.Router();

router.post("/", shortUrl);

router.get("/analytics/:id", handleGetAnalytics);

export default router;
