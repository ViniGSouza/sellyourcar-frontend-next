import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      token: string;
      email: string;
      phone: string;
    };
  }
}