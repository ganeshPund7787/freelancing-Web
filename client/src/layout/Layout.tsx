// import Header from "@/components/Header";
import Header from "@/components/Header";
import React from "react";

type Props = {
  children: React.ReactNode;
  showHero?: boolean;
};
const Layout = ({ children, showHero = false }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      {showHero ? "" : ""}
      <div className="flex-1 py-7 sm:px-5">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};
export default Layout;
