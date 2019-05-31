class CustomerRepo {
  constructor(usersData) {
    this.usersData = usersData;
  }

  createCustomer(customerName) {
    let customerId = this.usersData.length + 1;
    this.usersData.push({id: customerId, name: customerName})
  }

  findCustomerByName(name) {
    return this.usersData.find(user => user.name === name);
  }

  findCustomerById(id) {
    return this.usersData.find(user => user.id === id);
  }

}

export default CustomerRepo;