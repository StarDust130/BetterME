import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const authRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
const isProtectedRoute = createRouteMatcher(["/home(.*)", "/stats", "/create"]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  if (userId) {
    // If the user is logged in and tries to access a public route, redirect to /home
    if (authRoute(request)) {
      return Response.redirect(new URL("/home", request.url));
    }
  } else {
    // If the user is not logged in and tries to access a protected route, redirect to /
    if (isProtectedRoute(request)) {
      return Response.redirect(new URL("/sign-up", request.url));
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
