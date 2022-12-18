const { model, Schema } = require("mongoose");
const { isWithinInterval, isBefore, isAfter } = require("date-fns");
const toMalaysiaTime = require("@utils/timeZone");
const EventSchema = new Schema(
	{
		name: String,
		description: String,
		shortDescription: String,
		location: String,
		image: String,
		address: String,
		openHour: String,
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
		virtuals: {
			status: {
				get() {
					let currentDate = new Date();

					if (isBefore(currentDate, this.startDate)) {
						return "Upcoming";
					}

					if (isAfter(currentDate, this.endDate)) {
						return "Expired";
					}
					return "Active";
				},
			},
		},
	},
);

EventSchema.virtual("ticketTypes", {
	ref: "TicketTypes",
	localField: "_id",
	foreignField: "eventIds",
	justOne: false,
});

module.exports = model("Events", EventSchema);
