class Orders {
  constructor(roomServiceData) {
    this.roomServiceData = roomServiceData;
  }

  breakdownOfDatesAndDollars(customerId) {

  }

  getOrdersByDate(date) {
    const ordersByDate = this.roomServiceData.filter(data => data.date === date);
    const ordersFormatted = ordersByDate.map((order) => {
      return `<tr><td>${order.date}</td><td>${order.userID}</td>
      <td>${order.food}</td><td>${order.totalCost}</td></tr>`
    });
    console.log(ordersFormatted);
    return ordersFormatted;
  }

  dollarsSpentByDay() {

  }

  dollarsSpentOnAllDays() {

  }

}

export default Orders;