import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function DefaultLayout() {
  return (
    <div className="flex min-h-screen flex-col items-stretch">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-customer-home">
        {/* Dynamic Route Content */}
        <Outlet />
      </div>
      {/* </div> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
