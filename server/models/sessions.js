const { model, Schema } = require("mongoose");

const SessionSchema = new Schema(
	{
		eventId: String,
		ticketTypeId: String,
		time: {
			from: {
				type: String,
				require: true,
			},
			to: {
				type: String,
				require: true,
			},
		},
		date: String,
		availability: Number,
		active: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
		virtuals: {
			status: {
				get() {
					let currentDate = Date.now();

					// @ts-ignore
					if (this.time.from > currentDate) {
						return "Upcoming";
					}

					// @ts-ignore
					if (this.time.to < currentDate) {
						return "Expired";
					}

					return "Active";
				},
			},
		},
	},
);

SessionSchema.virtual("ticketType", {
	ref: "TicketTypes",
	localField: "ticketTypeId",
	foreignField: "_id",
	justOne: true,
});

SessionSchema.virtual("reservations", {
	ref: "Reservations",
	localField: "_id",
	foreignField: "sessionId",
	count: true,
});

module.exports = model("Sessions", SessionSchema);
