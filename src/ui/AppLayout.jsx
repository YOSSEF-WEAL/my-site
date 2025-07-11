import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./Footer";

function AppLayout() {
  return (
    <>
      <div className="max-w-[1350px] overflow-hidden md:overflow-visible mx-auto">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default AppLayout;
