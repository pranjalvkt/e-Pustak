import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = "geo-analytics";
let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress ||
      "";
    const { userAgent = "Unknown", platform = "Unknown" } = req.body || {};

    const client = await connectToDatabase();
    const db = client.db(dbName);

    await db.collection("pwa_installs").insertOne({
      ip,
      userAgent,
      platform,
      timestamp: new Date(),
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("PWA install error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
