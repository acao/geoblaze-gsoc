import "./globals.css";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GeoBlaze GSOC Estimator",
  description:
    "Performs a simple raster analysis to predict Soil Organic Carbon using FAO data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  // bah this only works for SSR anyways
  const path = headersList.get("x-pathname");
  return (
    <html lang="en">
      <body className={`${inter.className} App p-6`}>
        <main>{children}</main>
        <footer>
          <nav>
            <ul className="list-none">
              <li
                className={`inline-block p-3 pl-0 ${
                  path === "/" && "font-bold"
                }`}
              >
                {" "}
                <Link href="/">Home</Link>
              </li>
              <li
                className={`inline-block p-3 ${
                  path === "/about" && "font-bold"
                }`}
              >
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
