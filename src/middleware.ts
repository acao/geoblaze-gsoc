import { NextRequest, NextResponse } from "next/server";

// silly workaround from https://github.com/vercel/next.js/issues/43704#issuecomment-1454790390
export function middleware(request: NextRequest, response: NextResponse) {
  const requestHeaders = new Headers(request.headers);

  // Store current request pathname in a custom header
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: '/:path*',
}
