export { default } from "next-auth/middleware";


// import { NextResponse } from 'next/server';
// import { getSession } from 'next-auth/react';

// export async function middleware(req) {
//   const session = await getSession({ req });

//   if (!session) {
//     return NextResponse.redirect('/api/register');
//   }

//   return NextResponse.next();
// }

export const config = {
//   matcher: ['/api/newTask'], // Apply this middleware to API routes
  matcher:['/dashboard'],
};
