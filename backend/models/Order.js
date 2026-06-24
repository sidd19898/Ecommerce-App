const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },

            quantity: {
                type: Number,
                required: true
            },

            price: {
                type: Number,
                required: true
            }
        }
    ],

    shippingAddress: {
        fullName: String,
        phone: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        pincode: String,
        country: String
    },

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Confirmed",
            "Packed",
            "Shipped",
            "Delivered",
            "Cancelled"
        ],
        default: "Pending"
    },

    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Order", OrderSchema);