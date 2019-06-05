class RoomRepo {
  constructor(roomsData, bookingData) {
    this.roomsData = roomsData;
    this.bookingData = bookingData;
  }

  getAvailableRooms(date) {
    const bookingsByDate = this.bookingData.filter(book => book.date === date);
    const bookedRoomNumbers = bookingsByDate.map(booking => booking.roomNumber);
    const roomsAvailable = this.roomsData.filter(room => {
      return !bookedRoomNumbers.includes(room.number)
    });
    return roomsAvailable;
  }

  formatAvailableRooms(date) {
    const availableRooms = this.getAvailableRooms(date);
    const formattedRooms = availableRooms.map(room => {
      // if (room.bidet === true) {
      //   room.bidet = "YAH";
      // } else {
      //   room.bidet = "NAH";
      // }
      return `<tr><td>${room.number}</td><td>${room.roomType}</td>
      <td>${room.bidet}</td><td>${room.numBeds}</td>
      <td>$${room.costPerNight}</td></tr>`
    });
    return formattedRooms;
  }

  dropdownCustomerBookings (customerId) {
    const customerBookings = this.bookingData.filter(booking => {
      return booking.userID === customerId;
    });
    const formattedBookings = customerBookings.map(order => {
      return `<option value="${order.date}">${order.date}</option>`
    }).join('');
    return formattedBookings;
  }

  bookingForCustomer(customerId) {
    const customerBookings = this.bookingData.filter(booking => {
      return booking.userID === customerId;
    });
    const formattedBooking = customerBookings.map(booking => {
      return `<tr><td>${booking.date}</td><td>${booking.userID}</td>
      <td>${booking.roomNumber}</td></tr>`
    }).join('');
    if (formattedBooking.length === 0) {
      return `<p class="no-info-found">There are no bookings for this customer</p>`;
    } else {
      return `<table>
              <thead>
                <th>Date</th>
                <th>Customer ID</th>
                <th>Room</th>
              </thead>
              <tbody id="customer-bookings">
                ${formattedBooking}
              </tbody>
            </table>`;
    }
  }

}

export default RoomRepo;