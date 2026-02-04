import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // Ajusta esta URL a la de tu API real (orky-api)
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            },
          );

          if (!response.ok) return null;

          const data = await response.json();

          if (data && data.user) {
            // Aplanamos el objeto: mandamos los datos del usuario y el token al mismo nivel
            return {
              ...data.user,
              accessToken: data.access_token,
            };
          }

          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Esta rama se ejecuta la primera vez que se hace login
      if (user) {
        // Guardamos todo el objeto user (que ahora está aplanado) en el token
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        // Inyectamos los datos del usuario en el objeto session.user
        // Esto permite acceder a session.user.role, session.user.avatarUrl, etc.
        session.user = {
          ...session.user,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(token.user as any),
        };
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = !nextUrl.pathname.startsWith("/auth");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirige a login si no está autenticado
      } else if (isLoggedIn && nextUrl.pathname.startsWith("/auth")) {
        // Si ya está logueado y va a /auth/login, lo mandamos al "home/dashboard"
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/login", // Ajustado a tu ruta real
  },
});
