class Bookings {
  constructor(bookingData, roomsData) {
    this.bookingData = bookingData;
    this.roomsData = roomsData;
  }

  getDatesAndBooks() {
    let dateAndBooks = this.bookingData.reduce((acc, book) => {
      !acc[book.date] ? acc[book.date] = 1 : acc[book.date] += 1;
      return acc;
    }, {});
    return dateAndBooks;
  }

  // sortDate() {
    // if I get the chance, should be able to sort the days;
  // }

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

  BookingsForCurrentDay() {

  }

  filterRoomByType(date) {

  }

}

export default Bookings;