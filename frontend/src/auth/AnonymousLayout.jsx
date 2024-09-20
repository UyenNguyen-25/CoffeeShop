/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeft } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AnonymousLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-login-bg bg-cover bg-center bg-no-repeat">
      {/* Main Content */}
      <div className="h-full w-full bg-black opacity-50 z-0 absolute"></div>
      <div className="flex h-full flex-col items-center overflow-y-auto rounded-md">
        <div className="w-full font-mono z-40 p-8">
          <Link
            className="flex items-center gap-2 text-2xl text-white tracking-wider"
            onClick={() => navigate("/")}
          >
            <ArrowLeft strokeWidth={2.25} size={20} color="#FFF" /> Home
          </Link>
        </div>
        {/* Dynamic Route Content */}
        <main className="h-[75%] z-50 flex items-center">
          <div className="bg-white min-w-[400px] max-w-[450px] h-fit p-6 pb-2 rounded-lg">
            <Outlet />
          </div>
        </main>
      </div>
      {/* </div> */}

    </div >
  );
};

export default AnonymousLayout;
