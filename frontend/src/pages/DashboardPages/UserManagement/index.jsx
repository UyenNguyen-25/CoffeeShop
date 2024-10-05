import { useGetUsersQuery } from "@/redux/features/users/usersApiSlice";
import { useEffect, useState } from "react";
import { Input } from "antd";
import CreateAccount from "./CreateAccount";
import TableComponent from "./table/table";

const { Search } = Input;

const UserManagement = () => {
  const [userList, setUserList] = useState([]);
  const [params, setParams] = useState({
    search: "",
  });

  const { data: users, refetch, isLoading } = useGetUsersQuery(params, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true
  });

  const onSearch = (value) => {
    setParams((params) => ({ ...params, search: value }));
  };

  useEffect(() => {
    setUserList(users);
  }, [users]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Quản Lý Tài Khoản</h2>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between w-full">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
            className="w-1/3"
          />
          <CreateAccount refetch={refetch} />
        </div>

        <div>
          <TableComponent
            usersList={userList}
            isLoading={isLoading}
            refetch={refetch}
          />
        </div>
      </div>
    </>
  );
};

export default UserManagement;
