import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

import prisma from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    console.error("Missing credentials");
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    console.error("User not found");
                    return null;
                }

                try {
                    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                    if (!isValidPassword) {
                        console.error("Invalid password");
                        return null;
                    }
                } catch (error) {
                    console.error("Error validating password:", error);
                    return null;
                }

                return { id: user.id, email: user.email, name: user.name };
            },
        }),
    ],

    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google") {
                const email = user.email;
                const existingUser = await prisma.user.findUnique({ where: { email } });

                if (!existingUser) {
                    try {
                        await prisma.user.create({
                            data: {
                                email: email,
                                name: user.name,
                                image: user.image,
                                role: "user",
                                password: "",
                            },
                        });
                    } catch (error) {
                        console.error("Error creating user:", error);
                        return false;
                    }
                }
            }
            return true;
        },
        async session({ token, session }) {
            session.user.id = token.id
            session.user.name = token.name
            session.user.email = token.email
            session.user.image = token.picture
            return session;
        },
        async jwt({ token, user }) {
            const dbUser = await prisma.user.findFirst({
                where: { email: token.email },
            });

            if (!dbUser && user) {
                token.id = user.id;
                return token;
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
            };
        },
    },

    session: {
        strategy: "jwt",
    },

    jwt: {
        maxAge: 7 * 24 * 60 * 60,
    },

    pages: {
        signIn: '/sign-in',
    }
};
