import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/api";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "~/styles/globals.css";
import "node_modules/chessground/assets/chessground.base.css";
import "node_modules/chessground/assets/chessground.brown.css";
import "node_modules/chessground/assets/chessground.cburnett.css";

const theme = extendTheme({
  boxSizing: "border-box",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
