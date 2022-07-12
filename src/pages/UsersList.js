import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarCustom from "../components/NavbarCustom";
import TableUser from "../components/TableUser";
import { fetchUsers } from "../redux/features/userSlice";

function UsersList() {
  const user = useSelector((state) => state.getallusers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div>
      <NavbarCustom />
      {!user.loading && user.users.length ? (
        <TableUser user={user.users} />
      ) : null}
    </div>
  );
}

export default UsersList;
