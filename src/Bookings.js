class Bookings {
  constructor(bookingData, roomsData) {
    this.bookingData = bookingData;
    this.roomsData = roomsData;
  }

  getAvailableRooms(date) {
    const bookingsByDate = this.bookingData.filter(book => book.date !== date);
    const roomsAvailable = this.roomsData.filter(room => {
      let roomNumbers = bookingsByDate.map(book => book.roomNumber);
      return roomNumbers.includes(room.number)
    });
    return roomsAvailable;
  }

  roomsAvailablePercentage(date) {
    let availableRooms = this.getAvailableRooms(date);
    const percentage = (availableRooms.length / this.roomsData.length) * 100;
    return `${Math.round(percentage)}%`;
  }

  getDatesAndBooks() {
    let dateAndBooks = this.bookingData.reduce((acc, book) => {
      !acc[book.date] ? acc[book.date] = 1 : acc[book.date] += 1;
      return acc;
    }, {});
    return dateAndBooks;
  }

  getMostPopularDate() {
    let dateAndBooks = this.getDatesAndBooks();
    let popularDate = Object.keys(dateAndBooks).reduce((finalDate, date) => {
      return dateAndBooks[finalDate] > dateAndBooks[date] ? finalDate : date;
    }, 0);
    return popularDate;
  }

  leastPopularDate() {
    let dateAndBooks = this.getDatesAndBooks();
    let leastPopularDate = Object.keys(dateAndBooks).reduce((finalDate, date) => {
      return dateAndBooks[finalDate] < dateAndBooks[date] ? finalDate : date;
    }, 0);
    return leastPopularDate;
  }
  
  filterRoomsByType(date, type) {
    const availableRooms = this.getAvailableRooms(date);
    const roomsByType = availableRooms.filter(room => room.roomType === type);
    return roomsByType;
  }

  bookingsForCurrentDay(date) {
    const todaysBookings = this.bookingData.filter(book => book.date === date);
    return todaysBookings;
  }

}

export default Bookings;