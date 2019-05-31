class Orders {
  constructor(roomServiceData) {
    this.roomServiceData = roomServiceData;
  }

  breakdownOfDatesAndDollars(customerId) {

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