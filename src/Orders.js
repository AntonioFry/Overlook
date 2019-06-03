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
    return roomCosts.reduce((total, room) => {
      return total + room 
    }, 0);
  }

  serviceIncomeByDay(date) {
    const roomServiceByDay = this.roomServiceData.filter(order => {
      return order.date === date;
    });
    const roomServiceCosts = roomServiceByDay.map(service => {
      return service.totalCost
    });
    return roomServiceCosts.reduce((total, order) => {
      return total + order 
    }, 0);
  }

  totalIncomeByDay(date) {
    const totalServiceCosts = this.serviceIncomeByDay(date);
    const totalRoomCosts = this.roomIncomeByDay(date);
    return totalRoomCosts + totalServiceCosts;
  }

  roomServiceByCustomer(customerId) {
    const serviceByCustomer = this.roomServiceData.filter(order => {
      return order.userID === customerId; 
    });
    return serviceByCustomer;
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

  dollarsSpentByDay(date) {

  }

  dollarsSpentOnAllDays() {

  }

}

export default Orders;