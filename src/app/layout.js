import "./globals.css";
import { SearchProvider } from "@/lib/SearchContext";
import RadioPlayer from "@/components/RadioPlayer";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SearchProvider>
          {children}
          <RadioPlayer />
        </SearchProvider>
      </body>
    </html>
  );
}
