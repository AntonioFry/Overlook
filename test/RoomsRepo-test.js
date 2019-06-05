import chai from "chai";
const expect = chai.expect;

import RoomRepo from "../src/RoomRepo";
import bookingsMock from "../mock-data/bookings-mock";
import roomsMock from "../mock-data/rooms-mock";

describe('RoomRepo', function () {

  let roomRepo;
  beforeEach(function() {
    roomRepo = new RoomRepo(roomsMock, bookingsMock)
  });

  it('should be a function', function () {
    expect(RoomRepo).to.be.a('function');
  });

  it('should make a new instance of RoomRepo', function () {
    expect(roomRepo).to.be.an.instanceOf(RoomRepo);
  });

  it('should return all of available rooms for a day', function() {
    expect(roomRepo.getAvailableRooms("17/07/2019").length).to.equal(5);
  });

  it('should format the available rooms for the dom', function() {
    expect(roomRepo.formatAvailableRooms("17/07/2019").length).to.equal(5);
  });

  it('should return the bookings of a specific customer', function() {
    expect(roomRepo.bookingForCustomer(1)).to.be.a('string');
  });

  it('should return a html format of customers booking dates', function() {
    expect(roomRepo.dropdownCustomerBookings(1)).to.be.a('string');
  });

});
