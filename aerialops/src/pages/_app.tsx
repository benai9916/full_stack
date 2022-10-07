import type { AppType } from "next/app";
import { withTRPC } from "@trpc/next";
import superjson from "superjson";
import type { AppRouter } from "@/server/router";

const App: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";
    return {
      url,
      transformer: superjson,
      headers: () => {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
          };
        }
        return {};
      },
    };
  },
  ssr: false,
})(App);
