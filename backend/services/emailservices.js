import nodemailer from "nodemailer";

// Create a singleton transporter
let transporter = null;
const getTransporter = () => {
  if (!transporter) {
     transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "anku5556611@gmail.com",
        pass: "crqxppaopvvljpfw"
      }
    });
  }
  return transporter;
};

// 1️⃣ Send Event Registration Email
export const sendEventRegistrationEmail = async (userEmail, userName, eventDetails) => {
  try {
    const transporter = getTransporter();

    const info = await transporter.sendMail({
      from: `"University Events" <${process.env.SMTP_USER}>`,
      to: userEmail,
      subject: `Registration Confirmed: ${eventDetails.title}`,
      html: `
        <h2>Hello ${userName}!</h2>
        <p>You have successfully registered for <strong>${eventDetails.title}</strong></p>
        <h3>Event Details:</h3>
        <ul>
          <li><strong>Date:</strong> ${new Date(eventDetails.date).toLocaleDateString()}</li>
          <li><strong>Time:</strong> ${eventDetails.time}</li>
          <li><strong>Venue:</strong> ${eventDetails.venue}</li>
        </ul>
        <p>We look forward to seeing you there!</p>
        <p>Best regards,<br>University Events Team</p>
      `,
    });

    return { success: true, info };
  } catch (error) {
    console.error("Registration email error:", error);
    return { success: false, error };
  }
};

// 2️⃣ Send Event Reminder Email
export const sendEventReminderEmail = async (userEmail, userName, eventDetails) => {
  try {
    const transporter = getTransporter();

    const info = await transporter.sendMail({
      from: `"University Events" <${process.env.SMTP_USER}>`,
      to: userEmail,
      subject: `Reminder: ${eventDetails.title} is Tomorrow!`,
      html: `
        <h2>Hello ${userName}!</h2>
        <p>This is a friendly reminder about your upcoming event:</p>
        <h3>${eventDetails.title}</h3>
        <ul>
          <li><strong>Date:</strong> ${new Date(eventDetails.date).toLocaleDateString()}</li>
          <li><strong>Time:</strong> ${eventDetails.time}</li>
          <li><strong>Venue:</strong> ${eventDetails.venue}</li>
        </ul>
        <p>Don't forget to attend!</p>
        <p>Best regards,<br>University Events Team</p>
      `,
    });

    return { success: true, info };
  } catch (error) {
    console.error("Reminder email error:", error);
    return { success: false, error };
  }
};

// 3️⃣ Send OTP Email
export const sendOTP = async (email, otp) => {
  try {
    const transporter = getTransporter();

    const info = await transporter.sendMail({
      from: `"University Events" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Your OTP for uniE signup is: ${otp}`,
      html: `
        <h2>Hello ${email}!</h2>
        <p>Your OTP for uniE is <strong>${otp}</strong></p>
      `,
    });

    return { success: true, info };
  } catch (error) {
    console.error("OTP email error:", error);
    return { success: false, error };
  }
};
