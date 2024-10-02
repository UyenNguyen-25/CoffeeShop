import { useSelector } from "react-redux";
import CustomTable from "./CustomTable";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const TableComponent = ({ usersList, isLoading, refetch }) => {
  const listFormat = usersList?.map((user, index) => ({
    ...user,
    role: user.role,
    key: index + 1
  }));

  const user = useSelector(selectCurrentUser)

  return (
    <>
      <CustomTable
        list={listFormat}
        Loading={isLoading}
        refetch={refetch}
        currentUser={user.phoneNumber}
      />
    </>
  );
};

export default TableComponent;
