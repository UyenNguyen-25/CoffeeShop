import { useSendLogoutMutation } from "@/redux/features/auth/authApiSlice";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserQuery } from "@/redux/features/users/usersApiSlice";
import { Avatar, Button, Dropdown, Flex } from "antd";
import { ChevronDown, Lock } from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DropdownCustomize = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { itemsProps, className, currentLocation } = props;
  const user = useSelector(selectCurrentUser);
  const { data: userDetail } = useGetUserQuery({ user_phoneNumber: user?.user_phoneNumber },
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  )
  const splitName = userDetail?.user_fullname.split(" ");
  const navigate = useNavigate();
  const [sendLogout] = useSendLogoutMutation();

  const checkRoleGate = (item) => {
    return item?.permission.includes(userDetail?.user_role?.role_description?.toLowerCase()) && item;
  };

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

  return userDetail ? (
    <Dropdown menu={menuProps} placement="bottomRight" trigger={"click"}>
      <Button className="border-none h-fit shadow-none">
        <Flex gap={6} align="center">
          <Avatar className={className}>
            {userDetail?.user_fullname === "Ba, mẹ"
              ? "A"
              : splitName.slice(-1)[0].charAt(0)}
          </Avatar>
          {userDetail?.user_fullname}
          <ChevronDown />
        </Flex>
      </Button>
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
      <span className="lg:inline hidden">Sign in</span>
    </NavLink>
  );
};

export default DropdownCustomize;
