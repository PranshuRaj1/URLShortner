import { nanoid } from "nanoid";
import URL from "../models/url.js";

export default async function shortUrl(req, res) {
  const body = req.body;
  const id = nanoid(8);
  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }
  await URL.create({
    shortID: id,
    redirectURL: body.url,
    visitedHistory: [],
  });
  // console.log("created");

  return res.render("home", { id: id });
}

export async function handleGetAnalytics(req, res) {
  const shortID = req.params.id;

  console.log(shortID);

  const result = await URL.findOne({ shortID });

  return res.json({
    totalClicks: result.History.length,
    analytics: result.History,
  });
}
