import chai from "chai";
const expect = chai.expect;

import spies from "chai-spies";
chai.use(spies);

import roomServiceMock from "../mock-data/roomService-mock";
import Orders from "../src/Orders";
import roomsMock from "../mock-data/rooms-mock";
import bookingsMock from "../mock-data/bookings-mock";

describe('Orders', function() {

  let orders;
  beforeEach(function() {
    orders = new Orders(roomServiceMock, roomsMock, bookingsMock);
  });

  it('should be a function', function() {
    expect(Orders).to.be.a('function');
  });

  it('should make an instance of Orders', function() {
    expect(orders).to.be.an.instanceOf(Orders);
  });

  it('should get all orders based off date', function() {
    expect(orders.getOrdersByDate("24/12/2019")).to.be.a('string');
  });

  it('should return the total cost made from a room by date', function() {
    expect(orders.roomIncomeByDay("17/07/2019")).to.equal(344.89);
    expect(orders.roomIncomeByDay("21/08/2019")).to.equal(807.28);
  });

  it('should return the total cost of roomservice for a day', function() {
    expect(orders.serviceIncomeByDay("17/07/2019")).to.equal(18.63);
    expect(orders.serviceIncomeByDay("24/12/2019")).to.equal(33.72);
  });

  it('should return the total costs for a whole day', function() {
    expect(orders.totalIncomeByDay("17/07/2019")).to.equal(363.52);
  });

  it('should return an array of order by a specific customer', function() {
    expect(orders.roomServiceByCustomer(4)).to.be.a('string');
  });

  it('should return the cost of a paticular day for a customer', function() {
    expect(orders.dollarsSpentByDay(1)).to.be.a('object');
  });

  it('should return the cost of all roomservice for a customer', function() {
    expect(orders.dollarsSpentAllDays(1)).to.equal("$9.48");
  });

});