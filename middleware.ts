import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const user = request.cookies.get('user'); 
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

// Định nghĩa các đường dẫn mà middleware sẽ hoạt động
export const config = {
  matcher: ['/products/:path*', '/dashboard/:path*'], // Thay đổi các đường dẫn theo nhu cầu
};
