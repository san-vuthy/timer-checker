const { model, Schema } = require("mongoose");

const PromoSchema = new Schema(
	{
		code: {
			type: String,
			required: true,
			unique: true,
		},
		promoType: {
			type: String,
			enum: ["event", "ticketType", "any"],
			required: true,
		},
		eventId: {
			type: String,
		},
		ticketTypeId: {
			type: String,
		},
		limit: {
			type: Number,
			require: true,
		},
		from: {
			type: String,
			required: true,
		},
		to: {
			type: String,
			required: true,
		},
		fixed: {
			type: Number,
		},
		percentage: {
			type: Number,
		},
		priceType: {
			type: String,
			enum: ["fixed", "percentage"],
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
		merchantName: {
			type: String,
			default: "",
		},
		merchantId: {
			type: String,
			default: "",
		},
	},
	{
		virtuals: {
			status: {
				get() {
					let currentDate = Date.now();
					let start = new Date(this.from).getTime();
					let end = new Date(this.to).getTime();

					if (start > currentDate) {
						return false;
					}

					if (end < currentDate) {
						return false;
					}

					return true;
				},
			},
		},
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	},
);

PromoSchema.virtual("event", {
	ref: "Events",
	localField: "eventId",
	foreignField: "_id",
	justOne: true,
});

PromoSchema.virtual("ticketType", {
	ref: "TicketTypes",
	localField: "ticketTypeId",
	foreignField: "_id",
	justOne: true,
});

module.exports = model("Promos", PromoSchema);
