import chai from "chai";
const expect = chai.expect;

import usersData from "../mock-data/user-mock";
import CustomerRepo from "../src/CustomerRepo";

describe('CustomerRepo', function() {
  
  let customerRepo
  beforeEach(function() {
    customerRepo = new CustomerRepo(usersData);
  })

  it('should be a function', function() {
    expect(CustomerRepo).to.be.a('function');
  });

  it('should make a new instance of CustomerRepo', function() {
    expect(customerRepo).to.be.an.instanceOf(CustomerRepo);
  });

  it('should be able to add a new customer to userData', function() {
    expect(usersData.length).to.equal(6);
    customerRepo.createCustomer("John Doe");
    expect(usersData.length).to.equal(7);
  });

  

});