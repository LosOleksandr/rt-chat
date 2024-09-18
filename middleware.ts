import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
});

const allowedOrigins = [
  "http://localhost:8080",
  "https://rt-chat-pink.vercel.app",
];

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const origin = req.headers.get("origin");

  if (origin && !allowedOrigins.includes(origin)) {
    res.headers.append("Access-Control-Allow-Origin", origin);
  }

  res.headers.append("Access-Control-Allow-Credentials", "true");
  res.headers.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT"
  );
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  return res;
}

export const config = {
  matcher: ["/(users|conversations|account|settings)/:path*"],
};
