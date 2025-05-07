import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Outlet } from "react-router-dom";

type Props = {
  showHero?: boolean;
};

function Layout({ showHero = false }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showHero && <Hero />}
      <div className="container mx-auto flex-l py-10">
        <Outlet /> {/* Aquí se renderiza la ruta hija */}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
