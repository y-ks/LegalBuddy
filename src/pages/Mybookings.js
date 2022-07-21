import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarCustom from "../components/NavbarCustom";
import { fetchBookings } from "../redux/features/bookingSlice";
import TableBooking from "../components/TableBooking";
import TableBookingLawyer from "../components/TableBookingLawyer";

function Mybookings() {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.getallbookings);
  const userType = JSON.parse(localStorage.getItem("user")).userType;

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  return (
    <div>
      <NavbarCustom />;
      {!booking.loading && booking.bookings.length ? (
        userType === "user" ? (
          <TableBooking booking={booking.bookings} />
        ) : (
          <TableBookingLawyer booking={booking.bookings} />
        )
      ) : null}
    </div>
  );
}

export default Mybookings;
