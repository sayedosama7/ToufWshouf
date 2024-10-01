import type { AppProps } from "next/app";
import ThemeProvider from "@/theme/theme";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import NextNProgress from "nextjs-progressbar";
import "@/i18n/i18n";
import Layout from "@/layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/carousel.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Layout>
          <NextNProgress color="#E07026" height={3} showOnShallow={true} />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;

// NOTE: This  make price in product as components

// ------------------------------------- TODO --------------------
// TODO  end outing screen
// TODO  review design and edit
// TODO  make type product and fake data
// TODO  make condition for type product as components
// TODO  responsive
// TODO  Api
