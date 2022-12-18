const { model, Schema } = require("mongoose");

const TicketSchema = new Schema(
	{
		redeemed: {
			type: Boolean,
			default: false,
		},
		ticketTypeId: {
			type: String,
			required: true,
		},
		eventId: {
			type: String,
			required: true,
		},
		accountId: {
			type: String,
			required: true,
		},
		ticketCode: {
			type: String,
			default: "",
		},
		vendor: {
			type: String,
			enum: ["vangogh.com.my", "cloudjoi.com", "booking.doformetaverse.com"],
			required: true,
		},
		qrContent: {
			type: String,
			default: "",
		},
		qrUrl: {
			type: String,
			default: "",
		},
		timingId: {
			type: String,
			default: "",
		},
		timing: {
			from: {
				type: String,
				default: "",
			},
			to: {
				type: String,
				default: "",
			},
		},
		originOrderId: {
			type: String,
			default: "",
		},
		originOrderReference: {
			type: String,
			default: "",
		},
		originTicketId: {
			type: String,
			default: "",
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	},
);

TicketSchema.virtual("account", {
	ref: "Accounts",
	localField: "accountId",
	foreignField: "_id",
	justOne: true,
});

TicketSchema.virtual("reservation", {
	ref: "Reservations",
	localField: "_id",
	foreignField: "ticketId",
	justOne: true,
});

TicketSchema.virtual("ticketType", {
	ref: "TicketTypes",
	localField: "ticketTypeId",
	foreignField: "_id",
	justOne: true,
});

TicketSchema.virtual("event", {
	ref: "Events",
	localField: "eventId",
	foreignField: "_id",
	justOne: true,
});

module.exports = model("Tickets", TicketSchema);

// vendor
