import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.13.1/css/all.css"
          integrity="sha384-xxzQGERXS00kBmZW/6qxqJPyxW3UR0BPsL4c8ILaIWXva5kFi7TxkIIaMiKtqV1Q"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
          <Main />
        <NextScript />
      </body>
    </Html>
  );
}
