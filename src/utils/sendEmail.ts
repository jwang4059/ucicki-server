"use strict";
import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (to: string, subject: string, html: string) => {
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: process.env.GMAIL_USER, // generated ethereal user
			pass: process.env.GMAIL_PASS, // generated ethereal password
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: `"UCI CKI Clone" <${process.env.GMAIL_USER}>`, // sender address
		to, // list of receivers
		subject, // Subject line
		html,
	});

	console.log("Message sent: %s", info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
