class CustomerRepo {
  constructor(usersData) {
    this.usersData = usersData;
  }

  createCustomer(name) {
    
  }

  findCustomerByName(name) {
    return this.usersData.find(user => user.name === name);
  }

  findCustomerById() {
    return this.usersData.find(user => user.id === name);
  }

}

export default CustomerRepo;