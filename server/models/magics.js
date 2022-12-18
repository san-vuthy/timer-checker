const { model, Schema } = require("mongoose");
const { addDays, isAfter } = require("date-fns");
const MagicSchema = new Schema(
	{
		email: String,
		expiredAt: {
			type: Date,
			default: addDays(new Date(), 1),
		},
	},
	{
		virtuals: {
			status: {
				get() {
					let currentDate = new Date();
					if (isAfter(currentDate, this.expiredAt)) {
						return true;
					}
					return false;
				},
			},
		},
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	},
);

module.exports = model("Magics", MagicSchema);
