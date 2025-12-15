import { Outlet } from "react-router";
import Navbar from "../LayoutComponents/Navbar";
import Footer from "../LayoutComponents/Footer";

export default function AutheniticationLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
