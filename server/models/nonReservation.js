const { model, Schema } = require("mongoose");
const { addDays, isAfter } = require("date-fns");
const NonReservation = new Schema(
	{
		qrcode: {
			type: String,
			unique: true,
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	},
);

module.exports = model("NonReservation", NonReservation);
