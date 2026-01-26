import  {Resend}  from 'resend';

let resendClient=null
const getResendClient=()=>{
  if(!resendClient){
    if(!process.env.RESEND_API_KEY){
      throw new Error("RESEND_API_KEY is missing");
    }
    resendClient=new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

export const sendEventRegistrationEmail = async (userEmail, userName, eventDetails) => {
  try {
    const resend=getResendClient();
    const { data, error } = await resend.emails.send({
      from: 'University Events <onboarding@resend.dev>', // Change this later with your domain
      to: [userEmail],
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

    if (error) {
      console.error('Email sending error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    return { success: false, error };
  }
};

const sendEventReminderEmail = async (userEmail, userName, eventDetails) => {
  try {
    const resend=getResendClient();
    const { data, error } = await resend.emails.send({
      from: 'University Events <onboarding@resend.dev>',
      to: [userEmail],
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

    if (error) {
      console.error('Reminder email error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    return { success: false, error };
  }
};


