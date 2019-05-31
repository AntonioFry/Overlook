class Orders {
  constructor(roomServiceData) {
    this.roomServiceData = roomServiceData;
  }

  breakdownOfDates() {

  }

  breakdownOfDollars() {

  }

  getOrdersByDate(date) {
    let ordersByDate = this.roomServiceData.filter(data => data.date === date);
    return ordersByDate;
  }

  dollarsSpentByDay() {

  }

  dollarsSpentOnAllDays() {

  }

}

export default Orders;