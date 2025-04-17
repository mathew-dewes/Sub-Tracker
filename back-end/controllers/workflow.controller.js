import { createRequire } from 'module';
import Subscription from '../models/subscription.model.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);
import { sendReminderEmail } from '../utils/send-email.js';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');




const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {

    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);
    const currentTime = dayjs().tz('Pacific/Auckland');

    
    

    if (!subscription || subscription.status !== 'active') return;

    const renewalDate = dayjs.utc(subscription.renewalDate).tz('Pacific/Auckland');
    if (renewalDate.isBefore(currentTime)) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
        return;
    }

    for (const daysbefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysbefore, 'day').startOf('day');
        const today = currentTime.startOf('day');
        
        if (reminderDate.isAfter(today)) {
          await sleepUntilReminder(context, `Reminder ${daysbefore} days before`, reminderDate);
        }
        
        if (today.isSame(reminderDate)) {
          await triggerReminder(context, `${daysbefore} days before reminder`, subscription);
        }
}
});


const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());

}

const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async () => {
        console.log(`Triggering reminder - "${label}"`);

        await sendReminderEmail({
            to: subscription.user.email,
            type: label,
            subscription,
        })
    })
}