import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {jwtVerify} from "jose";

async function verify(token: string, secret: string){
    try {
        await jwtVerify(token, new TextEncoder().encode(secret));
        return true;
    } catch (error) {
        return false;
    }
}

export async function middleware(request: NextRequest) {
    
    const cookie = request.cookies.get('jwt')
    const secret = process.env.NEXT_PUBLIC_JWT
    const domain = process.env.NEXT_PUBLIC_DOMAIN
      
    
    if (cookie === undefined && domain !== undefined)  {
        
        if (request.nextUrl.pathname.startsWith('/profile')) return NextResponse.redirect(domain)
        if (request.nextUrl.pathname.startsWith('/logout')) return NextResponse.redirect(domain)
    }

    if (cookie !== undefined && secret !== undefined && domain !== undefined) {
        const payload = await verify(cookie,secret)
        if (request.nextUrl.pathname.startsWith('/login') && payload) return NextResponse.redirect(domain)
        if (request.nextUrl.pathname.startsWith('/signup') && payload) return NextResponse.redirect(domain)
        if (request.nextUrl.pathname.startsWith('/profile') && !payload) return NextResponse.redirect(domain)
        if (request.nextUrl.pathname.startsWith('/logout') && !payload) return NextResponse.redirect(domain)
    }
}