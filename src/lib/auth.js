 
 
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

const authURL =
  process.env.BETTER_AUTH_URL || "http://localhost:3000";

const secret = process.env.BETTER_AUTH_SECRET;

if (!uri) {
  throw new Error("MONGODB_URI is missing in .env.local");
}

if (!secret || secret.length < 32) {
  throw new Error(
    "BETTER_AUTH_SECRET must be at least 32 characters"
  );
}

// MongoDB connection
const client = new MongoClient(uri);

const db = client.db("booknook");

// Connect MongoDB once
const connectDB = client.connect().then(() => {
  console.log("Better Auth MongoDB connected!");
  return db;
}).catch((error) => {
  console.error("Better Auth MongoDB connection failed:", error);
  throw error;
});

// Better Auth configuration
export const auth = betterAuth({
  baseURL: authURL,
  secret,

  database: mongodbAdapter(await connectDB),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
  },

  plugins: [
    jwt({
      jwt: {
        issuer: authURL,
        audience: authURL,
        expirationTime: "15m",
      },
    }),
  ],

  user: {
    additionalFields: {
      image: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
});
