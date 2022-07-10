import React, { useEffect } from "react";
import Table from "../components/Table";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { fetchLawyers } from "../redux/features/lawyerSlice";
import NavbarCustom from "../components/NavbarCustom";

function LawyersList() {
  const lawyer = useSelector((state) => state.getalllawyers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLawyers());
  }, [dispatch]);

  return (
    <div>
      <NavbarCustom />
      {!lawyer.loading && lawyer.lawyers.length ? (
        <Table lawyer={lawyer.lawyers} />
      ) : null}
    </div>
  );
}

export default LawyersList;
