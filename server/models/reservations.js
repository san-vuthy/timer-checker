const { model, Schema } = require("mongoose");

const ReservationSchema = new Schema(
	{
		ticketId: {
			type: String,
			required: true,
			unique: true,
		},
		eventId: {
			type: String,
			required: true,
		},
		ticketTypeId: {
			type: String,
			required: true,
		},
		sessionId: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		from: {
			type: String,
			required: true,
		},
		to: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	},
);

ReservationSchema.virtual("ticket", {
	ref: "Tickets",
	localField: "ticketId",
	foreignField: "_id",
	justOne: true,
});

ReservationSchema.virtual("ticketType", {
	ref: "TicketTypes",
	localField: "ticketTypeId",
	foreignField: "_id",
	justOne: true,
});

ReservationSchema.virtual("event", {
	ref: "Events",
	localField: "eventId",
	foreignField: "_id",
	justOne: true,
});

ReservationSchema.virtual("session", {
	ref: "Sessions",
	localField: "sessionId",
	foreignField: "_id",
	justOne: true,
});

module.exports = model("Reservations", ReservationSchema);
