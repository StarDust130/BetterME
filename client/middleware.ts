import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define route matchers
const isProtectedRoute = createRouteMatcher(["/home(.*)", "/stats", "/create"]);
const isAuthRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // If the user is logged in and tries to access an auth route, redirect to /home
  if (userId && isAuthRoute(req)) {
    return Response.redirect(new URL("/home", req.url));
  }

  // If the user is not signed in and tries to access a protected route, redirect to sign-in
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  // Allow the request to continue if it doesn't match any conditions
  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
