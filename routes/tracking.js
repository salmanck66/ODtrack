const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Retrieve tracking details by phone number
router.post("/get-tracking", async (req, res) => {
  const { consignee_phone } = req.body;
  console.log(consignee_phone);
  
  if (!consignee_phone) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  try {
    const order = await Order.find({ consignee_phone });

    if (!order) {
      return res.status(404).json({ message: "Order not found for this phone number" });
    }

    res.json({
      message: "Tracking details retrieved successfully",
      tracking: order,
    });
  } catch (error) {
    console.error("Error retrieving tracking details:", error.message);
    res.status(500).json({ message: "Error retrieving tracking details" });
  }
});

// Delete tracking details by phone number
router.post("/delete-tracking", async (req, res) => {
  const { consignee_phone } = req.body;

  if (!consignee_phone) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  try {
    const deletedOrder = await Order.findOneAndDelete({ consignee_phone });

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found for this phone number" });
    }

    res.json({ message: "Tracking details deleted successfully" });
  } catch (error) {
    console.error("Error deleting tracking details:", error.message);
    res.status(500).json({ message: "Error deleting tracking details" });
  }
});

module.exports = router;
