import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)" , "/"]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  if (userId) {
    // If the user is logged in and tries to access a public route, redirect to /home
    if (isPublicRoute(request)) {
      return Response.redirect(new URL("/home", request.url));
    }
  } else {
    // If the user is not logged in and tries to access a non-public route, protect it
    if (!isPublicRoute(request)) {
      await auth.protect();
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
