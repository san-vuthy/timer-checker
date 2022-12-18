const { model, Schema } = require("mongoose");

const AdmissionSchema = new Schema(
	{
		ticketId: {
			type: String,
			unique: true,
			required: true,
		},
		accountId: {
			type: String,
			required: true,
		},
		reservationId: {
			type: String,
		},
		address: {
			type: String,
		},
		checkInBy: {
			type: String,
			required: true,
		},
		force: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	},
);
module.exports = model("Admissions", AdmissionSchema);
