class Orders {
  constructor(roomServiceData, roomsData, bookingData) {
    this.roomServiceData = roomServiceData;
    this.roomsData = roomsData;
    this.bookingData = bookingData;
  }

  roomIncomeByDay(date) {
    const bookingsByDate = this.bookingData.filter(book => book.date === date);
    const bookedRoomNumbers = bookingsByDate.map(booking => booking.roomNumber);
    const rooms = this.roomsData.filter(room => {
      return bookedRoomNumbers.includes(room.number)
    });
    const roomCosts = rooms.map(room => room.costPerNight);
    return roomCosts.reduce((total, room) => total + room);
  }

  serviceIncomeByDay(date) {
    const roomServiceByDay = this.roomServiceData.filter(order => {
      return order.date === date;
    });
    const roomServiceCosts = roomServiceByDay.map(service => {
      return service.totalCost
    });
    return roomServiceCosts.reduce((total, order) => total + order);
  }

  totalIncomeByDay(date) {
    const totalServiceCosts = this.serviceIncomeByDay(date);
    const totalRoomCosts = this.roomIncomeByDay(date);
    return totalRoomCosts + totalServiceCosts;
  }

  breakdownOfDatesAndDollars(customerId) {

  }

  getOrdersByDate(date) {
    const ordersByDate = this.roomServiceData.filter(data => {
      return data.date === date;
    });
    const ordersFormatted = ordersByDate.map((order) => {
      return `<tr><td>${order.date}</td><td>${order.userID}</td>
      <td>${order.food}</td><td>${order.totalCost}</td></tr>`
    });
    return ordersFormatted;
  }

  dollarsSpentByDay() {

  }

  dollarsSpentOnAllDays() {

  }

}

export default Orders;