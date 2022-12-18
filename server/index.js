require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const Tickets = require("./models/tickets");
const NoReservation = require("./models/nonReservation");
const Admissions = require("./models/admissions");

app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/check", async (req, res) => {
	const { qrcode } = req.body;

	const nrs = await NoReservation.findOne({ qrcode });
	if (nrs) {
		return res.json({
			createdAt: new Date(nrs.createdAt).toLocaleString(),
			updatedAt: new Date(nrs.updatedAt).toLocaleString(),
		});
	}

	const ticket = await Tickets.findOne({ qrContent: qrcode });
	if (ticket) {
		const admission = await Admissions.findOne({ ticketId: ticket._id });
		return res.json({
			admissionCreatedAt: new Date(admission.createdAt).toLocaleString(),
			admissionUpdatedAt: new Date(admission.updatedAt).toLocaleString(),
			ticketRedeemedAt: new Date(ticket.updatedAt).toLocaleString(),
		});
	}
	console.log("ticket", ticket);
	res.json({
		status: "ERROR",
		message: "NO DATA FOUND",
	});
});

mongoose.connect(process.env.DOFORMETAVERSE_PROD).then(() => {
	console.log("connected to database");
	app.listen(60050, "0.0.0.0", () => {
		console.log("Server is running at 60050");
	});
});
