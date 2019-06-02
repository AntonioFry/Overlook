import chai from "chai";
const expect = chai.expect;

import spies from "chai-spies";
chai.use(spies);

import Bookings from "../src/Bookings";
import bookingsMock from "../mock-data/bookings-mock";
import roomsMock from "../mock-data/rooms-mock";

describe("bookings", function() {

  let bookings;
  beforeEach(function() {
    bookings = new Bookings(bookingsMock, roomsMock);
  });

  it('should be a function', function() {
    expect(Bookings).to.be.a('function');
  });

  it('should make an instance of Bookings', function() {
    expect(bookings).to.be.an.instanceOf(Bookings);
  });

  it('should get the most popular date being booked', function() {
    expect(bookings.getDatesAndBooks()).to.be.an('object');
    expect(bookings.getMostPopularDate()).to.equal("21/08/2019");
  });

  it('should return the least popular date being booked', function() {
    expect(bookings.leastPopularDate()).to.equal("07/02/2020");
  });

  it('should return all available rooms by date', function() {
    expect(bookings.getAvailableRooms("17/07/2019").length).to.equal(5)
  });

  it('should return the percengtage of rooms available', function() {
    expect(bookings.roomsAvailablePercentage("17/07/2019")).to.equal('83%')
  });

  it('should be able to filter rooms by type', function() {
    expect(bookings.getAvailableRooms("21/08/2019").length).to.equal(4);
    expect(bookings.filterRoomsByType("21/08/2019", "junior suite").length).to.equal(2);
    expect(bookings.filterRoomsByType("21/08/2019", "single room").length).to.equal(4);
  });

  it('should return all the bookings for the current day', function() {
    expect(bookings.getAvailableRooms("17/07/2019").length).to.equal(5)
    expect(bookings.bookingsForCurrentDay("17/07/2019").length).to.equal(1);
  });

  it('should be able to book a room', function() {
    bookings.bookRoom(1, "17/07/2019");
    expect(bookings.bookingData.length).to.equal(7);
  });

  it('should be able to unbook a room', function() {
    bookings.unbookRoom(4);
    expect(bookings.bookingData.length).to.equal(5);
  });

});