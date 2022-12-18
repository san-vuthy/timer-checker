const { model, Schema } = require("mongoose");
const { isBefore, isAfter } = require("date-fns");
const TicketTypeSchema = new Schema(
	{
		name: String,
		description: String,
		image: String,
		eventIds: [String],
		price: Number,
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

TicketTypeSchema.virtual("tickets", {
	ref: "Tickets",
	localField: "_id",
	foreignField: "typeId",
	justOne: false,
});

TicketTypeSchema.virtual("events", {
	ref: "Events",
	localField: "eventIds",
	foreignField: "_id",
	justOne: false,
});

module.exports = model("TicketTypes", TicketTypeSchema);
