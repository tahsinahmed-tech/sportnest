import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { nextCookies } from "better-auth/next-js";

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    throw new Error("Unable to connect database")
}

const client = new MongoClient(mongoUri);
const db = client.db("sport_nest_db");



const githubClientID = process.env.GITHUB_CLIENT_ID;
const githubClientSECRET = process.env.GITHUB_CLIENT_SECRET;

const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSECRET = process.env.GOOGLE_CLIENT_SECRET;



export const auth = betterAuth({

    baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000", //different from docs

    database: mongodbAdapter(db, {
        client,
    }),

    //...other options
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        ...(githubClientID && githubClientSECRET
            ? {
                github: {
                    clientId: githubClientID,
                    clientSecret: githubClientSECRET
                }
            } : {}
        ),

        ...(googleClientID && googleClientSECRET
            ? {
                google: {
                    clientId: googleClientID,
                    clientSecret: googleClientSECRET
                }
            } : {}
        )
    },

    plugins: [nextCookies()],
});