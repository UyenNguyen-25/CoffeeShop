import { Layout, Typography, theme, Flex } from "antd";
import DropdownCustomize from "../../../common/components/dropdown";
import { useSelector } from "react-redux";
import { ArrowRightLeft, LogOut } from "lucide-react";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
const { Header } = Layout;

function Navbar() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const userDetail = useSelector(selectCurrentUser);
  const itemsProps = [
    {
      label: "Hoa Đất",
      key: "/",
      icon: <ArrowRightLeft />,
    },
    {
      label: "Đăng xuất",
      key: "/login",
      icon: <LogOut />,
    },
  ];

  return (
    <Header
      style={{
        padding: 0,
        marginBottom: 25,
        background: colorBgContainer,
      }}
    >
      <Flex
        className="h-full w-full px-6 text-sm lg:text-[17px]"
        justify="space-between"
        align="center"
      >
        <Typography.Title
          level={3}
          style={{ color: "#4C2113", marginBottom: 0, fontWeight: "bold" }}
        >
          HoaDat Dashboard - {userDetail?.role?.toUpperCase()}
        </Typography.Title>
        <DropdownCustomize
          itemsProps={itemsProps}
          className="bg-[#cfdcfd] text-[#4C2113]"
          currentUser={userDetail}
        />
      </Flex>
    </Header>
  );
}

export default Navbar;
