import {
  ArrowRightLeft,
  LogOut,
  ShoppingCart,
  User,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Badge } from "antd";
import { useEffect, useState } from "react";
import DropdownCustomize from "../../../common/components/dropdown";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import logo from "../../../../assets/logo_withStroke.png" 

function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const currentUser = useSelector(selectCurrentUser);
  const cart = useSelector((state) => state.cart);
  const currentLocation = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const countCart = cart?.items?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity;
  }, 0);

  const itemsProps = [
    {
      label: "Hồ sơ",
      key: "/profile",
      icon: <User />,
      permission: ["staff"]
    },
    {
      label: "Dashboard",
      key: "dashboard",
      icon: <ArrowRightLeft />,
      permission: ["admin", "staff"],
    },
    {
      label: "Đăng xuất",
      key: "/login",
      icon: <LogOut />,
    },
  ];

  const routes = [
    { title: "Home", path: "/" },
    { title: "Product", path: "/products" },
    { title: "Blog", path: "/blog" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-200 ${currentLocation.pathname === "/" ?
        scrollPosition > 50 ? 'bg-black shadow-xl' : 'bg-transparent' :
        "bg-[#F1DEBC] relative"
        }`}
    >
      {/* NavBar */}
      <div className="flex items-center justify-between p-1 px-6 lg:pl-24 lg:pr-10">
        <Link to="/" className={` w-[10%] ${currentLocation.pathname === "/" ? "text-[#ffffff]" : "text-[#4C2113]"}`}>
        <img src={logo} className=""/>
        </Link>

        <div className="flex space-x-5 lg:space-x-16">
          {routes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
                color: currentLocation.pathname === "/" ? isActive ? "#DCB485" : "#ffffff" : "#4C2113",
              })}
              className="text-xl lg:text-[22px]"
            >
              {route.title}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm lg:text-[17px]">
          {/* Cart */}
          {!currentUser && (
            <Badge count={countCart}>
              <NavLink
                to="/cart"
                className="flex items-center gap-2 relative  px-4 py-3 rounded-xl lg:text-[17px]"
                style={({ isActive }) => ({
                  // fontWeight: isActive ? "bold" : "normal",
                  color: currentLocation.pathname === "/" ? isActive ? "#DCB485" : "#ffffff" : "#4C2113",
                  backgroundColor: isActive && "#7c7c7c36"
                })}
              >
                <ShoppingCart size={21} />
                <span className="lg:inline hidden">Cart</span>
              </NavLink>
            </Badge>
          )}

          {/* User Dropdown */}
          <DropdownCustomize
            itemsProps={itemsProps}
            className="bg-[#fde3cf] text-[#f56a00]"
            currentLocation={currentLocation.pathname}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
