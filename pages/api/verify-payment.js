import crypto from "crypto";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return res.status(500).json({ success: false, error: "Missing RAZORPAY_KEY_SECRET." });
  }

  const {
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature,
    customer,
  } = req.body || {};

  if (!orderId || !paymentId || !signature) {
    return res.status(400).json({ success: false, error: "Incomplete payment response." });
  }

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const isValid = expectedSignature === signature;
  if (!isValid) {
    return res.status(400).json({ success: false, error: "Invalid payment signature." });
  }

  const mailUser = process.env.MAIL_USER?.trim();
  const mailPass = process.env.MAIL_APP_PASSWORD?.trim();

  const formDetails = customer || {};
  const emailText = [
    "New registration received after successful Rs.1 payment.",
    "",
    `Payment ID: ${paymentId}`,
    `Order ID: ${orderId}`,
    "",
    `First name: ${formDetails.firstName || "-"}`,
    `Last name: ${formDetails.lastName || "-"}`,
    `College / Institute: ${formDetails.collegeInstitute || "-"}`,
    `Email: ${formDetails.email || "-"}`,
    `Phone: ${formDetails.phone || "-"}`,
    `How can we help: ${formDetails.helpOption || "-"}`,
    `Message: ${formDetails.message || "-"}`,
  ].join("\n");

  if (!mailUser || !mailPass) {
    return res.status(200).json({
      success: true,
      mailSent: false,
      warning: "Payment verified but email credentials are missing.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

    await transporter.sendMail({
      from: mailUser,
      to: "surajpadhi01@gmail.com",
      subject: "New Registration - Tawade Consultancy",
      text: emailText,
    });

    return res.status(200).json({
      success: true,
      mailSent: true,
      message: "Payment verified and email sent successfully.",
    });
  } catch (error) {
    console.error("Registration email send failed:", error);
    return res.status(200).json({
      success: true,
      mailSent: false,
      warning: "Payment verified, but email sending failed.",
    });
  }
}
