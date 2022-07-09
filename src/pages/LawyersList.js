import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { fetchLawyers } from "../redux/features/lawyerSlice";

function LawyersList() {
  const lawyer = useSelector((state) => state.getalllawyers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLawyers());
  }, [dispatch]);

  return (
    <div>
      <Header />
      {!lawyer.loading && lawyer.lawyers.length ? (
        <Table lawyer={lawyer.lawyers} />
      ) : null}
    </div>
  );
}

export default LawyersList;
