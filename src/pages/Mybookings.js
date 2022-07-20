import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarCustom from "../components/NavbarCustom";
import { fetchBookings } from "../redux/features/bookingSlice";
import TableBooking from "../components/TableBooking";
import { fetchLawyers } from "../redux/features/lawyerSlice";

function Mybookings() {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.getallbookings);
  const lawyer = useSelector((state) => state.getalllawyers);
  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchLawyers());
  }, [dispatch]);
  return (
    <div>
      <NavbarCustom />;
      {!booking.loading && booking.bookings.length ? (
        <TableBooking booking={booking.bookings} lawyer={lawyer.lawyers} />
      ) : null}
    </div>
  );
}

export default Mybookings;
