import chai from "chai";
const expect = chai.expect;

import spies from "chai-spies";
chai.use(spies);

import roomServiceMock from "../mock-data/roomService-mock";
import Orders from "../src/Orders";

describe('Orders', function() {

  let orders;
  beforeEach(function() {
    orders = new Orders(roomServiceMock);
  });

  it('should be a function', function() {
    expect(Orders).to.be.a('function');
  });

  it('should make an instance of Orders', function() {
    expect(orders).to.be.an.instanceOf(Orders);
  });

  it('should get all orders based off date', function() {
    expect(orders.getOrdersByDate("24/12/2019").length).to.equal(2);
    expect(orders.getOrdersByDate("01/01/2020").length).to.equal(1);
  });

});