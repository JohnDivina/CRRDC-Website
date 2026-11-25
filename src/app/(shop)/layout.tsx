import Masthead from "@/components/layout/Masthead";
import ShopFooter from "@/components/layout/ShopFooter";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { LanguageProvider } from "@/components/layout/LanguageContext";
import LanguageToggle from "@/components/layout/LanguageToggle";
import "leaflet/dist/leaflet.css";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="public-layout">
          <Masthead />
          <main id="main-content" className="page-enter">
            {children}
          </main>
          <ShopFooter />
          <ScrollToTop />
          <LanguageToggle />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
