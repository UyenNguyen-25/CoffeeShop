import { useSendLogoutMutation } from "@/redux/features/auth/authApiSlice";
import { Avatar, Dropdown, Flex } from "antd";
import { ArrowRightLeft, ChevronDown, Lock, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DropdownCustomize = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { className, currentLocation, currentUser } = props;
  const splitName = currentUser?.fullName.split(" ");
  const navigate = useNavigate();
  const [sendLogout] = useSendLogoutMutation();

  const checkRoleGate = (item) => {
    return item?.permission.includes(currentUser?.role?.toLowerCase()) && item;
  };

  const itemsProps = [
    // {
    //   label: "Hồ sơ",
    //   key: "/profile",
    //   icon: <User />,
    //   permission: ["staff"]
    // },
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

  const checkRoleGateItem = itemsProps
    .map((item) => (item?.permission ? checkRoleGate(item) : item))
    .filter((item) => item !== false);

  const handleMenuClick = async (e) => {
    if (e.key === "/login") {
      await sendLogout();
      toast.success("Đăng xuất thành công");
      navigate("/login");
    } else navigate(e.key);
  };

  const menuProps = {
    items: checkRoleGateItem,
    onClick: handleMenuClick,
  };

  return currentUser ? (
    <Dropdown menu={menuProps} placement="bottomRight" trigger={"click"} className={`h-fit ${currentLocation === "/" ? "text-white hover:text-[#DCB485]" : "hover:text-white text-[#4C2113]"} hover:bg-[#7c7c7c36] px-2 py-2 rounded-md`}>
      <Flex gap={6} align="center">
        <Avatar>
          {splitName.slice(-1)[0].charAt(0)}
        </Avatar>
        {currentUser?.fullName}
        <ChevronDown />
      </Flex>
    </Dropdown>
  ) : (
    <NavLink
      to="/login"
      className="flex items-center gap-2 relative hover:bg-[#7c7c7c36] px-4 py-3 rounded-xl text-[#545454] hover:text-[#545454] lg:text-[17px]"
      style={({ isActive }) => ({
        // fontWeight: isActive ? "bold" : "normal",
        color: currentLocation === "/" ? isActive ? "#DCB485" : "#ffffff" : "#4C2113",
      })}
    >
      <Lock size={21} />
      <span className="lg:inline hidden">Đăng nhập</span>
    </NavLink>
  );
};

export default DropdownCustomize;
