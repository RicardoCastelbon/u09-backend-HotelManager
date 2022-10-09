const createBooking = async (req: any, res: any) => {
  res.send("Create Booking");
};

const getAllBookings = async (req: any, res: any) => {
  res.send("Get all Bookings");
};

const getOneBooking = async (req: any, res: any) => {
  res.send("Get one Booking");
};

const updateBooking = async (req: any, res: any) => {
  res.send("Update Booking");
};

const deleteBooking = async (req: any, res: any) => {
  res.send("Delete one Booking");
};

export { createBooking, getAllBookings, getOneBooking, updateBooking, deleteBooking };
