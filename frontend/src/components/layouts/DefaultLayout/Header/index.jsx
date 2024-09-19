import {
  ArrowRightLeft,
  LogOut,
  ReceiptText,
  ShoppingCart,
  User,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Badge } from "antd";
import { useEffect, useState } from "react";
import DropdownCustomize from "../../../common/components/dropdown";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const currentUser = useSelector(selectCurrentUser);
  const cart = useSelector((state) => state.cart);
  const currentPath = useLocation();
  
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
      permission: ["customer", "staff", "manager"]
    },
    {
      label: "Dashboard",
      key: "dashboard",
      icon: <ArrowRightLeft />,
      permission: ["admin", "staff", "manager"],
    },
    {
      label: "Đơn mua",
      key: "purchase",
      icon: <ReceiptText />,
      permission: ["customer", "staff", "manager"]
    },
    {
      label: "Đăng xuất",
      key: "/login",
      icon: <LogOut />,
    },
  ];

  const routes = [
    { title: "Trang chủ", path: "/" },
    { title: "Sản Phẩm", path: "/products" },
    { title: "Liên hệ", path: "/contact" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrollPosition > 50 ? 'bg-black shadow-xl' : 'bg-transparent'
      }`}
    >
      {/* NavBar */}
      <div className="flex items-center justify-between p-3 px-6 lg:pl-24 lg:pr-10 text-[#ffffff]">
        <Link to="/" className="font-bold text-3xl text-[#ffffff]">
          Coffee Shop
        </Link>

        <div className="flex space-x-5 lg:space-x-16">
          {routes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
                color: isActive ? "#DCB485" : "#ffffff",
              })}
              className="text-xl lg:text-[22px]"
            >
              {route.title}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2 lg:gap-6 text-sm lg:text-[17px]">
          {/* Cart */}
          {currentUser?.user_role.role_description !== "admin" && (
            <Badge count={countCart}>
              <NavLink
                to="/cart"
                className="flex items-center gap-2 relative hover:bg-[#f2f2f2] p-2 rounded-xl text-[#545454] hover:text-[#545454] lg:text-[17px]"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "#E44918" : "#545454",
                })}
              >
                <ShoppingCart size={21} color="white" />
                <span className="lg:inline hidden text-white">Giỏ hàng</span>
              </NavLink>
            </Badge>
          )}

          {/* User Dropdown */}
          <DropdownCustomize
            itemsProps={itemsProps}
            className="bg-[#fde3cf] text-[#f56a00]"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
