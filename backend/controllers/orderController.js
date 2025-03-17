import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
// @desc Create new order
// @route POST api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order itmes");
  } else {
    const order = new Order({
      orderItems: orderItems.map((order) => ({
        ...order,
        product: order._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      createdAt: new Date(),
    });
    const getItemPrice = async (id) => {
      const price = Number((await Product.findById(id)).price);
      return price;
    };
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    const itemsPrices = [];
    for (let i = 0; i < orderItems.length; i++) {
      let price = await getItemPrice(orderItems[i]._id);
      itemsPrices.push(price);
    }
    order.itemsPrice = addDecimals(
      itemsPrices.reduce(
        (acc, item, i) => acc + item * order.orderItems[i].qty,
        0
      )
    );
    order.shippingPrice = order.itemsPrice >= 100 ? 0 : 10;
    order.taxPrice = addDecimals(Number(0.15 * order.itemsPrice).toFixed(2));
    order.totalPrice = (
      Number(order.itemsPrice) +
      Number(order.shippingPrice) +
      Number(order.taxPrice)
    ).toFixed(2);
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});
// @desc Get logged in user orders
// @route POST /api/orders/mine
// @access Prnpivate
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});
// @desc Get order by ID
// @route GET  /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
// @desc Update order to paid
// @route GET /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Data.now();
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
// @desc Get all orders
// @route GET /api/orders/
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
