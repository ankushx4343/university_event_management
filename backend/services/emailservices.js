import nodemailer from "nodemailer";

let transporter;

export const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_HOST,
      port: Number(process.env.BREVO_SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS,
      },
    });
  }
  return transporter;
};

// 1️⃣ Event Registration Email
export const sendEventRegistrationEmail = async (userEmail, userName, eventDetails) => {
  try {
    const transporter = getTransporter();

    const info = await transporter.sendMail({
      from: `University Events <${process.env.BREVO_SENDER_EMAIL}>`,
      to: userEmail,
      subject: `Registration Confirmed: ${eventDetails.title}`,
      html: `
        <h2>Hello ${userName}!</h2>
        <p>You have successfully registered for <strong>${eventDetails.title}</strong></p>
        <ul>
          <li><strong>Date:</strong> ${new Date(eventDetails.date).toLocaleDateString()}</li>
          <li><strong>Time:</strong> ${eventDetails.time}</li>
          <li><strong>Venue:</strong> ${eventDetails.venue}</li>
        </ul>
        <p>See you there!</p>
      `,
    });

    return { success: true, info };
  } catch (error) {
    console.error("Registration email error:", error);
    return { success: false, error };
  }
};

// 2️⃣ Event Reminder Email
export const sendEventReminderEmail = async (userEmail, userName, eventDetails) => {
  try {
    const transporter = getTransporter();

    const info = await transporter.sendMail({
      from: `University Events <${process.env.BREVO_SENDER_EMAIL}>`,
      to: userEmail,
      subject: `Reminder: ${eventDetails.title} is Tomorrow`,
      html: `
        <h2>Hello ${userName}!</h2>
        <p>This is a reminder for:</p>
        <h3>${eventDetails.title}</h3>
        <ul>
          <li><strong>Date:</strong> ${new Date(eventDetails.date).toLocaleDateString()}</li>
          <li><strong>Time:</strong> ${eventDetails.time}</li>
          <li><strong>Venue:</strong> ${eventDetails.venue}</li>
        </ul>
      `,
    });

    return { success: true, info };
  } catch (error) {
    console.error("Reminder email error:", error);
    return { success: false, error };
  }
};

// 3️⃣ OTP Email
export const sendOTP = async (email, otp) => {
  try {
    const transporter = getTransporter();

    const info = await transporter.sendMail({
      from: `University Events <${process.env.BREVO_SENDER_EMAIL}>`,
      to: email,
      subject: "Your OTP for uniE",
      html: `
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This otp expires in 5 minutes.</p>
      `,
    });

    return { success: true, info };
  } catch (error) {
    console.error("OTP email error:", error);
    return { success: false, error };
  }
};