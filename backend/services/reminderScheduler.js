import cron from 'node-cron';
import Event from '../models/eventModel.js';
import { sendEventReminderEmail } from './emailservices.js';

export const startReminderScheduler = () => {

    //This runs every day at 9:00 AM
    cron.schedule('32 15 * * *', async () => {
        console.log('🕒 [CRON JOB STARTED] Running daily reminder check at:', new Date().toLocaleString());
        try {
            //step 1 calculate tomorrow's date
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);

            const dayAfterTomorrow = new Date(tomorrow);
            dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1)
            console.log("looking for the events on:", tomorrow.toDateString());

            //step 2:find events happening tomorrow
            const upcomingEvents = await Event.find({
                eventdate: {
                    $gte: tomorrow,
                    $lt: dayAfterTomorrow
                }
            }).populate('registereduser', 'email firstname');

            //step 3:check if any event found 
            if (upcomingEvents.length === 0) {
                console.log("no event schedule for tomorrow no reminder to send");
                return;
            }

            console.log(`found ${upcomingEvents.length} starting to send reminders...`)
            let emailsent = 0;
            let emailfailed = 0;

            //loop through each event
            for (const event of upcomingEvents) {
                //loop through each registered user
                for (const user of event.registereduser) {
                    console.log(`sending reminder to ${user.firstname}(${user.email})`);
                    const emailresult = await sendEventReminderEmail(
                        user.email,
                        user.firstname,
                        {
                            title: event.title,
                            date: event.eventdate,
                            time: event.eventtime,
                            venue: event.location
                        }
                    )
                    if (emailresult.success) {
                        emailsent++;
                    } else {
                        emailfailed++;
                    }

                }
            }
            console.log('\n✅ [CRON JOB COMPLETED]');
            console.log(`   📊 Summary: ${emailsent} emails sent, ${emailfailed} failed`);

        } catch (error) {
            console.error('❌ [CRON JOB ERROR]:', error);
        }
    });
    console.log('✅ Event reminder scheduler initialized successfully!');
    console.log('⏰ Reminders will be sent daily at 9:00 AM');
}