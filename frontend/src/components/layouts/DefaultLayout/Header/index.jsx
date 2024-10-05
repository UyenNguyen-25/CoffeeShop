import { useEffect, useState } from 'react';
import { Layout, Menu, Drawer, Button, Dropdown, Flex, Badge, Avatar } from 'antd';
import { CoffeeOutlined, MenuOutlined, SyncOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRightLeft, ChevronDown, LogOut, ShoppingCart } from 'lucide-react';
import { useSendLogoutMutation } from '@/redux/features/auth/authApiSlice';
import { toast } from 'sonner';
import HoaDatLogo from '@/assets/Logo-HoaDat';

const { Header } = Layout;

const ResponsiveHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const currentUser = useSelector(selectCurrentUser);
  const cart = useSelector((state) => state.cart);
  const currentLocation = useLocation()
  const splitName = currentUser?.fullName.split(" ");
  const [sendLogout] = useSendLogoutMutation();
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
      label: "Trang chủ",
      key: "/",
    },
    {
      label: "Sản Phẩm",
      key: "submenuProduct",
      children:
        [{
          label: "Toàn bộ Sản Phẩm",
          key: "/products",
          icon: <CoffeeOutlined style={{ fontSize: '18px' }} />,
        },
        {
          label: "Trộn Cà Phê",
          key: "/mix-coffee",
          icon: <SyncOutlined style={{ fontSize: '18px' }} />,
        }]
    },
    {
      label: "Bài viết",
      key: "/blog",
    },
    currentUser && {
      label: "Bảng điều khiển",
      key: "dashboard",
      icon: <ArrowRightLeft />,
    },
    currentUser && {
      label: "Đăng xuất",
      key: "/login",
      icon: <LogOut />,
    }
  ];

  const handleMenuClick = async (e) => {
    if (e.key === "/login") {
      await sendLogout();
      toast.success("Đăng xuất thành công");
      navigate("/login");
    } else navigate(e.key);
  };

  const personalMenuProps = {
    items: [{
      label: "Bảng điều khiển",
      key: "dashboard",
      icon: <ArrowRightLeft />,
    },
    {
      label: "Đăng xuất",
      key: "/login",
      icon: <LogOut />,
    }],
    onClick: handleMenuClick,
  }

  const productMenuProps = {
    items: [{
      label: "Toàn bộ sản shẩm",
      key: "/products",
      icon: <CoffeeOutlined style={{ fontSize: '18px' }} />,
    },
    {
      label: "Trộn cà phê",
      key: "/mix-coffee",
      icon: <SyncOutlined style={{ fontSize: '18px' }} />,
    }],
    onClick: handleMenuClick,
  }

  const routes = [
    { title: "Trang chủ", path: "/" },
    { title: "Sản phẩm", path: "/products" },
    { title: "Bài viết", path: "/blog" },
  ];


  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const onClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-200 max-md:px-3 px-8 h-fit ${currentLocation.pathname === "/" ?
      scrollPosition > 50 ? 'bg-black shadow-xl' : 'bg-transparent' :
      "bg-[#F1DEBC] relative"
      }`}>

      {/* Desktop-menu */}
      <div className="flex items-center justify-between h-full w-full">
        <HoaDatLogo width={"10%"} height={"20%"} onClick={() => navigate("/")} />
        <div className="flex space-x-5 lg:space-x-10 max-lg:hidden">
          {routes.map((route) => {
            return route.path !== "/products" ? (
              <NavLink
                key={route.path}
                to={route.path}
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: currentLocation.pathname === "/" ? isActive ? "#DCB485" : "#ffffff" : "#4C2113",
                })}
                className="text-base lg:text-[22px] hover:bg-[#7c7c7c36] px-5 flex items-center rounded-md w-fit text-nowrap"
              >
                {route.title}
              </NavLink>
            ) : (
              <Dropdown key={route.path} menu={productMenuProps} placement="bottomRight" trigger={"hover"} className={`h-fit text-xl lg:text-[22px]
                      ${currentLocation.pathname === "/" ? "text-white" : currentLocation.pathname === "/products" || currentLocation.pathname === "/mix-coffee" ? "text-[#4C2113] font-bold" : "text-[#4C2113] font-normal"} hover:bg-[#7c7c7c36] px-5 py-2 rounded-md`}>
                <Flex gap={6} align="center" className='w-fit text-nowrap'>
                  {route.title}
                  <ChevronDown size={18} />
                </Flex>
              </Dropdown>)
          })}
        </div>
        <div className='flex items-center md:gap-5 gap-2'>
          {/* Cart */}
          {!currentUser ? (
            <> <Badge count={countCart}>
              <NavLink
                to="/cart"
                className="flex items-center gap-2 relative  px-4 py-3 rounded-xl lg:text-[17px] hover:bg-[#7c7c7c36]"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: currentLocation.pathname === "/" ? isActive ? "#DCB485" : "#ffffff" : "#4C2113",
                  backgroundColor: isActive && "#7c7c7c36"
                })}
              >
                <ShoppingCart size={21} />
                <span className="lg:inline hidden text-nowrap">Giỏ hàng</span>
              </NavLink>
            </Badge>
            </>
          ) :
            <Dropdown menu={personalMenuProps} placement="bottomRight" trigger={"click"} className={`h-fit max-md:hidden ${currentLocation.pathname === "/" ? "text-white hover:text-[#DCB485]" : "hover:text-white text-[#4C2113]"} hover:bg-[#7c7c7c36] px-2 py-2 rounded-md`}>
              <Flex gap={6} align="center">
                <Avatar>
                  {splitName.slice(-1)[0].charAt(0)}
                </Avatar>
                {currentUser?.fullName}
                <ChevronDown />
              </Flex>
            </Dropdown>
          }
          {/* Mobile-menu */}
          <div className="lg:hidden">
            <Button
              ghost
              icon={
                <MenuOutlined style={{
                  color: currentLocation.pathname !== "/" && "#4C2113"
                }
                } />}
              onClick={showDrawer}
              style={{
                borderColor: currentLocation.pathname !== "/" && "#4C2113"
              }}
            />
            <Drawer
              title="Menu"
              placement="right"
              onClose={onClose}
              open={drawerOpen}
            >
              <Menu mode="inline" items={itemsProps} onClick={handleMenuClick} />
            </Drawer>
          </div>
        </div>
      </div>

    </Header>
  );
};

export default ResponsiveHeader;
