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
  console.log("created");

  return res.json({ id: id });
}
