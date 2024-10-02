import {
  ChevronDown,
  ShoppingCart,
  // User,
} from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Badge, Dropdown, Flex } from "antd";
import { useEffect, useState } from "react";
import DropdownCustomize from "../../../common/components/dropdown";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { CoffeeOutlined, SyncOutlined } from "@ant-design/icons";

function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const currentUser = useSelector(selectCurrentUser);
  const cart = useSelector((state) => state.cart);
  const currentLocation = useLocation()
  const navigate = useNavigate();

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
      label: "Các Sản Phẩm",
      key: "/products",
      icon: <CoffeeOutlined style={{ fontSize: '18px' }} />,
    },
    {
      label: "Trộn Cà Phê",
      key: "/mix-coffee",
      icon: <SyncOutlined style={{ fontSize: '18px' }} />,
    },
  ];

  const checkRoleGateItem = itemsProps
    .map((item) => item)

  const handleMenuClick = async (e) => {
    if (e.key === "/products") {
      navigate("/products");
    } else navigate(e.key);
  };


  const menuProps = {
    items: checkRoleGateItem,
    onClick: handleMenuClick,
  };

  const routes = [
    { title: "Trang chủ", path: "/" },
    { title: "Sản Phẩm", path: "/products" },
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
        <Link to="/" className={` ${currentLocation.pathname === "/" ? "text-[#ffffff]" : "text-[#4C2113]"} font-header-logo text-5xl w-fit py-2 font-semibold`}>
          Hoa Đất
        </Link>

        <div className="flex space-x-5 lg:space-x-16">
          {routes.map((route) => {
            return route.path !== "/products" ? (
              <NavLink
                key={route.path}
                to={route.path}
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: currentLocation.pathname === "/" ? isActive ? "#DCB485" : "#ffffff" : "#4C2113",
                })}
                className="text-xl lg:text-[22px] hover:bg-[#7c7c7c36] px-5 flex items-center rounded-md"
              >
                {route.title}
              </NavLink>
            ) : <Dropdown menu={menuProps} placement="bottomRight" trigger={"hover"} className={`h-fit text-xl lg:text-[22px] 
            ${currentLocation.pathname === "/" ? "text-white" : currentLocation.pathname === "/products" || currentLocation.pathname === "/mix-coffee" ? "text-[#4C2113] font-bold" : "text-[#4C2113] font-normal"} hover:bg-[#7c7c7c36] px-5 py-2 rounded-md`}>
              <Flex gap={6} align="center">
                {route.title}
                <ChevronDown size={18} />
              </Flex>
            </Dropdown>
          })}
        </div>

        <div className="flex items-center gap-2 text-sm lg:text-[17px]">
          {/* Cart */}
          {!currentUser && (
            <Badge count={countCart}>
              <NavLink
                to="/cart"
                className="flex items-center gap-2 relative  px-4 py-3 rounded-xl lg:text-[17px] hover:bg-[#7c7c7c36]"
                style={({ isActive }) => ({
                  // fontWeight: isActive ? "bold" : "normal",
                  color: currentLocation.pathname === "/" ? isActive ? "#DCB485" : "#ffffff" : "#4C2113",
                  backgroundColor: isActive && "#7c7c7c36"
                })}
              >
                <ShoppingCart size={21} />
                <span className="lg:inline hidden">Giỏ hàng</span>
              </NavLink>
            </Badge>
          )}

          {/* User Dropdown */}
          <DropdownCustomize
            itemsProps={itemsProps}
            className="bg-[#fde3cf] text-[#f56a00]"
            currentLocation={currentLocation.pathname}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div >
  );
}

export default Header;
