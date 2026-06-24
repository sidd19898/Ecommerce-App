require("dotenv").config();
const dns = require("dns");
const mongoose = require("mongoose");

const dnsServers = (process.env.DNS_SERVERS || "8.8.8.8")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

dns.setServers(dnsServers);

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    console.log("✅ Database already connected");
    return mongoose.connection;
  }

  if (mongoose.connection.readyState === 2) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Database connected successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

module.exports = connectDB;