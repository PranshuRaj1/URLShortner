import express from "express";
import shortUrl from "../controllers/url.js";
const router = express.Router();

router.post("/", shortUrl);

export default router;
