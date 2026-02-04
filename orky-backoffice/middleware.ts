export { auth as middleware } from "@/auth";

export const config = {
  // Pattern standard para excluir archivos estáticos, api interna y assets
  matcher: [
    "/((?!api|_next/static|_next/image|animations|assets|favicon.ico|.*\\..*).*)",
  ],
};
