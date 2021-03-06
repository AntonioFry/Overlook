class Bookings {
  constructor(bookingData, roomsData) {
    this.bookingData = bookingData;
    this.roomsData = roomsData;
  }

  bookRoom(customerId, desiredDate, room) {
    let takenRoom = this.bookingData.find(booking => {
      return booking.date === desiredDate && booking.roomNumber === room;
    });
    if (takenRoom === undefined) {
      this.bookingData.push(
        { userID: customerId, date: desiredDate, roomNumber: room }
      );
      return { 'userID': customerId, 'date': desiredDate, 'roomNumber': room };
    } else {
      return `You cannot book this room for this date`;
    }
  }

  unbookRoom(customerId, date) {
    const bookings = this.bookingData.filter(booking => {
      return booking.userID === customerId;
    });
    const specificBooking = bookings.find(booking => {
      return booking.date === date;
    });
    const bookingIndex = this.bookingData.indexOf(specificBooking);
    this.bookingData.splice(bookingIndex, 1); 
  }

  // upgradeRoom(userId) {
    
  // }

  getAvailableRooms(date) {
    const bookingsByDate = this.bookingData.filter(book => book.date === date);
    const bookedRoomNumbers = bookingsByDate.map(booking => booking.roomNumber);
    const roomsAvailable = this.roomsData.filter(room => {
      return !bookedRoomNumbers.includes(room.number)
    });
    return roomsAvailable;
  }

  roomsOccupiedPercentage(date) {
    const availableRooms = this.getAvailableRooms(date);
    const percentage = (availableRooms.length / this.roomsData.length) * 100;
    return `${100 - percentage}%`;
  }

  getDatesAndBooks() {
    const dateAndBooks = this.bookingData.reduce((acc, book) => {
      !acc[book.date] ? acc[book.date] = 1 : acc[book.date] += 1;
      return acc;
    }, {});
    return dateAndBooks;
  }

  getMostPopularDate() {
    const dateAndBooks = this.getDatesAndBooks();
    const popularDate = Object.keys(dateAndBooks).reduce((finalDate, date) => {
      return dateAndBooks[finalDate] > dateAndBooks[date] ? finalDate : date;
    }, 0);
    return popularDate;
  }

  leastPopularDate() {
    let dateAndBooks = this.getDatesAndBooks();
    let leastPopularDate = Object.keys(dateAndBooks).reduce((endDate, date) => {
      return dateAndBooks[endDate] < dateAndBooks[date] ? endDate : date;
    }, 0);
    return leastPopularDate;
  }
  
  filterRoomsByType(date, type) {
    const availableRooms = this.getAvailableRooms(date);
    const roomsByType = availableRooms.filter(room => room.roomType === type);
    if (roomsByType.length > 0) {
      return roomsByType;
    } else {
      return availableRooms;
    }
  }

  // formatRoomTypes(date, type) {
  //   const roomsByType = this.filterRoomsByType(date, type);
  //   const formattedRooms = roomsByType.map(room => {
  //     return 
  //   });
  // }

  bookingsForCurrentDay(date) {
    const todaysBookings = this.bookingData.filter(book => book.date === date);
    return todaysBookings;
  }

}

export default Bookings;