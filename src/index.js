// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/index.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import data from './data';
import Bookings from './Bookings';
import Orders from './Orders'
import RoomRepo from './RoomRepo';
import Customer from './Customer';
import CustomerRepo from "./CustomerRepo";


setTimeout(() => {
  $(document).ready(() => {
  
    $('ul.tabs li').click(function () {
      let tab_id = $(this).attr('data-tab');

      $('ul.tabs li').removeClass('selected');
      $('.content').removeClass('selected');

      $(this).addClass('selected');
      $("#" + tab_id).addClass('selected');
    });
    
    
    function todaysDate() {
      let date = new Date();
      if (date.getDay() < 10 && (date.getMonth() + 1) < 10) {
        return `0${date.getDate()}/0${date.getMonth() + 1}/${date.getFullYear()}`;
      } else if (date.getDate() < 10) {
        return `0${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      } else if ((date.getMonth() + 1) < 10) {
        return `${date.getDate()}/0${date.getMonth() + 1}/${date.getFullYear()}`;
      } else {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      }
    }

    function createPrice(min, max) {
      let price = Math.round(Math.random() * (max - min) + min);
      return `${price}`;
    }

    let customer;
    let customerRepo = new CustomerRepo(data.userData);
    let bookings = new Bookings(data.bookingData, data.roomsData);
    let orders = new Orders(data.roomServiceData, data.roomsData, data.bookingData);
    let roomRepo = new RoomRepo(data.roomsData, data.bookingData);
    
    $('#todays-date').text(todaysDate());

    $('#rooms-available')
      .text(`There are ${bookings.getAvailableRooms(todaysDate()).length} rooms available today`);

    $('#todays-income')
      .text(`The hotel made $${orders.totalIncomeByDay(todaysDate())} today`);

    $('#rooms-occupied')
      .text(`${bookings.roomsOccupiedPercentage(todaysDate())} of rooms are occupied today`);

    $('#popular-booking-date')
      .text(`${bookings.getMostPopularDate(todaysDate())} is the most booked date`);
    
    $('#least-booked-date')
      .text(`${bookings.leastPopularDate(todaysDate())} is the least booked date`);

    $('#all-roomservice-today').append(orders.getOrdersByDate(todaysDate()));

    $('#date-for-orders').text(todaysDate());

    $('#sandwiches-selector').append(orders.formatSandwiches());

    function displayCustomerInfo() {
      $('#table-available-rooms')
        .append(roomRepo.formatAvailableRooms(todaysDate()));
      $('#customer-bookings-container')
        .prepend(roomRepo.bookingForCustomer(customer.id))
      $('.customer-id').text(customer.id);
      $('.customer-name').text(customer.name);
      $('#customer-roomservice')
        .append(orders.roomServiceByCustomer(customer.id));
      $('#current-customer').show('slow');
      $('#bookings-date-selector')
        .append(roomRepo.dropdownCustomerBookings(customer.id));
      $('#total-spent').text(orders.dollarsSpentAllDays(customer.id));
    }

    function removeCustomerInfo() {
      $('#customer-bookings-container').empty();
      $('.customer-id').empty();
      $('.customer-name').empty();
      $('#customer-roomservice').empty();
      $('#table-available-rooms').empty();
      $('#bookings-date-selector').empty();
      $('#total-spent').empty();
    }

    $('#add-customer-button').on('click', function(e) {
      e.preventDefault();
      let nameInput = $('#add-customer-input').val();
      customer = new Customer(customerRepo.createCustomer(nameInput));
      removeCustomerInfo();
      displayCustomerInfo(customer);
      $('.customer-specific-content').removeAttr("hidden");
    });

    $('#book-room-button').on('click', function(e) {
      e.preventDefault();
      $('#book-room-form').slideToggle("slow");
    });

    $('#submit-roomtype').on('click', function(e) {
      e.preventDefault();
      let date = $('#date-to-book').val();
      let roomType = $('#roomtype-picker').val();
      let filteredBookData = bookings.filterRoomsByType(date, roomType);
      let pickedRoom = filteredBookData.shift();
      bookings.bookRoom(customer.id, date, pickedRoom.number);
      $('#book-room-form').slideToggle("slow");
      removeCustomerInfo();
      displayCustomerInfo();
    });

    function getUserBySearch(inputValue) {
      if (customerRepo.findCustomerByName(inputValue) === undefined) {
        let parsedInput = parseInt(inputValue);
        return customerRepo.findCustomerById(parsedInput);
      } else {
        return customerRepo.findCustomerByName(inputValue);
      }
    }

    $('#search-customer-button').on('click', function(e) {
      e.preventDefault();
      let customerSearchInput = $('#search-customer').val();
      let foundCustomer = getUserBySearch(customerSearchInput);
      customer = new Customer(foundCustomer);
      removeCustomerInfo();
      displayCustomerInfo(customer);
      $('.customer-specific-content').removeAttr("hidden");
    });

    $('#toggle-unbook-form').on('click', function(e) {
      e.preventDefault();
      $('#unbook-room-form').slideToggle("slow");
    });

    $('#unbook-room-button').on('click', function(e) {
      e.preventDefault();
      let date = $('date-to-unbook').val();
      bookings.unbookRoom(customer.id, date);
      removeCustomerInfo();
      displayCustomerInfo();
    });

    $('#toggle-order-form').on('click', function(e) {
      e.preventDefault();
      $('#add-order-form').slideToggle("slow")
    })

    $('#add-order-button').on('click', function(e) {
      e.preventDefault();
      const cost = createPrice(16, 25);
      const date = $('#bookings-date-selector').val();
      const food = $('#sandwiches-selector').val();
      orders.addOrder(customer.id, date, food, cost);
      removeCustomerInfo();
      displayCustomerInfo();
    });

    $('#rooms-by-date-button').on('click', function(e) {
      e.preventDefault();
      const inputValue = $('#rooms-by-date-input').val();
      $('#table-available-rooms').empty();
      $('#table-available-rooms')
        .append(roomRepo.formatAvailableRooms(inputValue));
    });

    $('#orders-by-date-button').on('click', function(e) {
      e.preventDefault();
      const inputValue = $('#orders-by-date-input').val();
      $('#all-roomservice-today').empty();
      $('#all-roomservice-today').append(orders.getOrdersByDate(inputValue));
      $('#date-for-orders').text(inputValue);
    });

  });  
}, 250);