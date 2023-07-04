import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

const title = "GeoBlaze GSOC Estimator Example";

const description =
  "Performs a simple raster analysis to predict Soil Organic Carbon using FAO data";

const images = "https://geoblaze-gsoc.vercel.app/screenshot.png";

const authors = "Rikki Schulte";

export const metadata: Metadata = {
  title,
  description,
  authors: { name: authors, url: "https://rikki.dev" },
  openGraph: {
    images,
    title,
    description,
    authors,
  },
  twitter: {
    images,
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        async
        defer
        type="text/javascript"
        src="https://analytics.ostr.io/qYJ5Qerm82QkH3ZJh.js"
        strategy="worker"
      />

      <body className={`${inter.className} App p-6`}>
        <main>{children}</main>
        <footer>
          <nav>
            <ul className="list-none">
              <li className={`inline-block p-3 pl-0`}>
                {" "}
                <Link href="/">Home</Link>
              </li>
              <li className={`inline-block p-3`}>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </nav>
          <p>
            <a href="https://creativecommons.org/licenses/by-nc/3.0/">
              CC BY-NC 3.0
            </a>
            &nbsp;&copy;&nbsp;Rikki Schulte&nbsp;
          </p>
        </footer>
      </body>
    </html>
  );
}
