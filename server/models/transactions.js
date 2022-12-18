const { model, Schema } = require("mongoose");
const { ethers } = require("ethers");

const TransactionSchema = new Schema(
	{
		paymentId: {
			type: String,
			required: true,
			unique: true,
		},
		orderId: {
			type: String,
		},
		items: {
			type: [String],
			required: true,
		},
		userId: { type: String, required: true },
		amount: { type: Number, required: true },
		code: { type: String },
		gateway: {
			type: String,
			enum: ["stripe", "upay", "counter", "vendor"],
		},
		vendorId: String,
		vendoerTxData: String,
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	},
);

TransactionSchema.virtual("tickets", {
	ref: "Tickets",
	localField: "items",
	foreignField: "_id",
	justOne: false,
});

TransactionSchema.virtual("user", {
	ref: "Accounts",
	localField: "userId",
	foreignField: "_id",
	justOne: true,
});

TransactionSchema.virtual("order", {
	ref: "Orders",
	localField: "orderId",
	foreignField: "orderId",
	justOne: true,
});

module.exports = model("TX", TransactionSchema);
