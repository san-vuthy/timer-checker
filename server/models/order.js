const { model, Schema } = require("mongoose");

const OrderSchema = new Schema(
	{
		code: {
			type: String,
			default: "",
		},
		orderId: {
			type: Number,
			unique: true,
			default: () => new Date().getTime(),
		},
		items: {
			type: [
				{
					ticketTypeId: String,
					qty: Number,
				},
			],
		},
		price: {
			subtotal: Number,
			discount: Number,
			grandtotal: Number,
		},
		reservation: {
			admission: {
				date: String,
				from: String,
				to: String,
			},
			eventId: String,
		},
		userId: String,
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	},
);

module.exports = model("Orders", OrderSchema);
