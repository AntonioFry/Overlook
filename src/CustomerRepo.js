class CustomerRepo {
  constructor(usersData) {
    this.usersData = usersData;
  }

  createCustomer(name) {
    let customerId = this.usersData.length + 1;
    console.log()
  }

  findCustomerByName(name) {
    return this.usersData.find(user => user.name === name);
  }

  findCustomerById() {
    return this.usersData.find(user => user.id === name);
  }

}

export default CustomerRepo;