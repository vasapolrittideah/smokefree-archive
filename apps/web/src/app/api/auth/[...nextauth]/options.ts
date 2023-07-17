import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: <string>process.env.GOOGLE_CLIENT_ID,
            clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password"},
            },
            async authorize(credentials, _) {
                const res = await fetch("http://localhost:8082/api/v1/auth/signin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials!.email,
                        password: credentials!.password,
                    }),
                });

                const data = await res.json();

                if (data["access_token"]) {
                    return data;
                }

                return null;
            }
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === "google") {
                console.log(profile);
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.access_token;
            }

            return Promise.resolve(token);
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken;
            session.error = token.error;

            return Promise.resolve(session);
        }
    },
    pages: {
        signIn: "/signin"
    }
};
