import { NextRequest, NextResponse } from 'next/server'


export default function middleware(req: NextRequest) {
    const token = req.cookies.get(process.env.NEXT_PUBLIC_TOKEN as string)

    if (!token) {
        return NextResponse.redirect(new URL('/signin', req.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/home/:path*',
}
