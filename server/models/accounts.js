const { model, Schema } = require("mongoose");

const AccountSchema = new Schema(
	{
		name: String,
		email: {
			type: String,
			unique: true,
		},
		phoneNumber: {
			type: String,
		},
		role: {
			type: String,
			enum: ["admin", "affilliate", "user", "crew"],
			default: "user",
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	},
);

AccountSchema.virtual("tickets", {
	ref: "Tickets",
	localField: "_id",
	foreignField: "accountId",
	justOne: false,
});

module.exports = model("Accounts", AccountSchema);
