import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  //   const cspHeader = `
  //     script-src 'self' 'unsafe-eval' 'unsafe-inline' https: http: 'nonce-${nonce}' 'strict-dynamic';
  //     script-src-elem 'self' https: http: 'nonce-${nonce}';
  //     base-uri 'self';
  //     font-src 'self';
  //     object-src 'none';
  //     form-action 'self';
  //     block-all-mixed-content;
  // `;

  const cspHeader = `
    script-src-elem 'self' https: http: 'unsafe-inline';
    base-uri 'self';
    font-src 'self';
    object-src 'none';
    form-action 'self';
    block-all-mixed-content;
`;

  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers);
  // requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    cspHeader.replace(/\s{2,}/g, " ").trim()
  );

  // You can also set request headers in NextResponse.next
  const response = NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}
