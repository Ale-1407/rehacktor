import { Outlet, useLoaderData } from "react-router";
import Navbar from "../LayoutComponents/Navbar";
import Footer from "../LayoutComponents/Footer";
import Sidebar from "../LayoutComponents/Sidebar";

export default function Layout() {
  const genres = useLoaderData();

  return (
    <>
      <Navbar />
      <section className="grid grid-cols-7 gap-4">
        <div>
          <Sidebar genres={genres} />
        </div>
        <div className="col-span-6">
          <Outlet />
        </div>
      </section>
      <Footer />
    </>
  );
}
