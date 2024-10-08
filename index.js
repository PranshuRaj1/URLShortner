import express from "express";
import urlRoute from "./routes/url.js";
import dbConnect from "./db/connect.js";
import URL from "./models/url.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
dbConnect(process.env.MONGODB_URI).then(() => {
  console.log("db connected");
});

app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortID },
      {
        $push: {
          History: {
            visitedHistory: Date.now(),
          },
        },
      },
      { new: true } // To return the updated document
    );

    if (!entry) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error finding or updating entry:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log("Server Started!!");
});
