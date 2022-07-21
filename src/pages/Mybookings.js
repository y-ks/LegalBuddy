import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarCustom from "../components/NavbarCustom";
import { fetchBookings } from "../redux/features/bookingSlice";
import TableBooking from "../components/TableBooking";
import StripedRowExample from "../components/TableBooking2";

function Mybookings() {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.getallbookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  return (
    <div>
      <NavbarCustom />;
      {!booking.loading && booking.bookings.length ? (
        // <TableBooking booking={booking.bookings} />
        <StripedRowExample booking={booking.bookings} />
      ) : null}
    </div>
  );
}

export default Mybookings;
