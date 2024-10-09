import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { LeftOutlined, RightOutlined, FileTextOutlined, HomeOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Menu, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const user = useSelector(selectCurrentUser);
  const user_role = user?.role;

  const getItem = (label, key, icon, permission) => {
    return (
      permission.includes(user_role) && {
        key,
        icon,
        label,
        permission,
      }
    );
  };

  const items = [
    getItem("Bảng điều khiển", "/dashboard", <HomeOutlined />, [
      "admin",
      "staff",
    ]),
    getItem(
      "Quản lý sản phẩm",
      "products-management",
      <ShopOutlined />,
      ["admin", "staff"]
    ),
    getItem("Quản lý mã khuyến mãi",
      "/dashboard/promotions-management",
      <FileTextOutlined />, [
      "admin",
      "staff",
    ]),
    getItem("Quản lý đơn hàng", "/dashboard/orders-management", <FileTextOutlined />, [
      "admin",
      "staff",
    ]),
    getItem("Quản lý tài khoản", "/dashboard/users-management", <UserOutlined />, [
      "admin",
      "staff",
    ])
  ];

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          controlItemBgActive: "#FFFFFF",
          colorText: "#FFFFFF",
        },
      }}
    >
      <Sider
        collapsed={collapsed}
        className="h-screen relative"
      >
        {collapsed === false && (
          <Typography className="text-center text-3xl font-semibold my-8">
            Danh mục
          </Typography>
        )}
        <Menu
          defaultSelectedKeys={location.pathname}
          mode="inline"
          items={items}
          onClick={(e) => handleNavigate(e.key)}
          className="bg-transparent"
        >
        </Menu>
        <Button size="large" onClick={() => setCollapsed(!collapsed)} className="absolute bottom-5 left-[100%] flex items-center rounded-s-none bg-[#001529] border-none">
          {!collapsed ? <LeftOutlined size={22} /> :
            <RightOutlined size={22} />}
        </Button>
      </Sider>
    </ConfigProvider>
  );
};

export default Sidebar;
