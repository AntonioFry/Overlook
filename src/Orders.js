// import { access } from "fs";

class Orders {
  constructor(roomServiceData, roomsData, bookingData) {
    this.roomServiceData = roomServiceData;
    this.roomsData = roomsData;
    this.bookingData = bookingData;
    this.sandwiches = ['Generic Plastic Sandwich',
      'Generic Soft Sandwich',
      'Tasty Fresh Sandwich',
      'Rustic Soft Sandwich',
      'Sleek Concrete Sandwich',
      'Rustic Wooden Sandwich'];
  }

  addOrder(customerId, desiredDate, desiredFood, cost) {
    this.roomServiceData.push(
      { 'userID': customerId, 'date': desiredDate,
        'food': desiredFood, 'totalCost': cost }
    );
  }

  formatSandwiches() {
    return this.sandwiches.map(sandwich => {
      return `<option value="${sandwich}">${sandwich}<option>`
    });
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
    const ordersFormatted = serviceByCustomer.map((order) => {
      return `<tr><td>${order.date}</td><td>${order.userID}</td>
      <td>${order.food}</td><td>$${order.totalCost}</td></tr>`
    }).join('');
    if (ordersFormatted.length === 0) {
      return `<p class="no-info-found">There is no roomservice for this customer</p>`
    } else {
      return `<table>
            <thead>
              <th>Date</th>
              <th>Customer ID</th>
              <th>Food</th>
              <th>Cost</th>
            </thead>
            <tbody id="customer-roomservice">
              ${ordersFormatted}
            </tbody>
          </table>`
    }
  }

  getOrdersByDate(date) {
    const ordersByDate = this.roomServiceData.filter(data => {
      return data.date === date;
    });
    const ordersFormatted = ordersByDate.map((order) => {
      return `<tr><td>${order.date}</td><td>${order.userID}</td>
      <td>${order.food}</td><td>${order.totalCost}</td></tr>`
    }).join('');
    if (ordersFormatted.length === 0) {
      return  `<p class="no-info-found">There is no roomservice for this day</p>`;
    } else {
      return `<table>
            <thead>
              <th>Date</th>
              <th>Customer ID</th>
              <th>Food</th>
              <th>Cost</th>
            </thead>
            <tbody id="all-roomservice-today">
              ${ordersFormatted}
            </tbody>
          </table>`
    }
  }

  dollarsSpentByDay(date) {

  }

  dollarsSpentOnAllDays() {

  }

}

export default Orders;