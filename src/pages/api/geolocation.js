import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const forwarded = req.headers["x-forwarded-for"];
    let ip = forwarded
      ? forwarded.split(",")[0].trim()
      : req.socket.remoteAddress;

    if (
      process.env.NODE_ENV === "development" ||
      ip === "::1" ||
      ip === "127.0.0.1"
    ) {
      ip = "8.8.8.8"; // test IP for local development
    }

    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoRes.json();
    let userAgent = req.headers["user-agent"] || "Unknown";

    const visitor = {
      ip: geoData.ip || ip,
      city: geoData.city || null,
      region: geoData.region || null,
      country: geoData.country_name || null,
      postal: geoData.postal || null,
      timezone: geoData.timezone || null,
      userAgent,
      timestamp: new Date(),
      isTestData: ip === "8.8.8.8",
    };

    const client = await clientPromise;
    const db = client.db("geo-analytics");
    await db.collection("visitors").insertOne(visitor);

    res.status(200).json({ success: true, location: visitor });
  } catch (err) {
    console.error("Geolocation API error:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}
