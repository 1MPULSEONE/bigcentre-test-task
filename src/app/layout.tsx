import "~/styles/globals.scss";

import { Montserrat } from "next/font/google";

export const metadata = {
  title: "Бигцентр",
  description: "Страница возврата товара",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.className}`}>
      <body>{children}</body>
    </html>
  );
}
