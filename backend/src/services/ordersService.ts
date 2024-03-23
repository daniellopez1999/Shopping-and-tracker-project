class OrderService {
  constructor(orderRepository, inventoryService) {
    this.orderRepository = orderRepository;
    this.inventoryService = inventoryService;
  }
}
