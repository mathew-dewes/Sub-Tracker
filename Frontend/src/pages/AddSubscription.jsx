import React, { useState } from 'react'
import { useMyContext } from '../context/MyContext'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

const AddSubscription = () => {
    const [viewTerms, setViewTerms] = useState(false);
    const {addSubscription, fetchSubscriptions} = useMyContext();

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        frequency: 'Daily',
        startDate: new Date().toISOString().split("T")[0],
        sendEmailReminder: true
    });

    const getMinStartDate = (frequency) => {
        const daysMap = {
            Daily: 0,
            Weekly: 6,
            Monthly: 29,
            Yearly: 364
        }

        const daysBack = daysMap[frequency] || 0;
        const minDate = new Date();
        minDate.setDate(minDate.getDate() - daysBack);
        return minDate.toISOString().split('T')[0];
    };

    const handleChange = (e) => {
   
        
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev, 
        [name]:type === 'checkbox'? checked: value,    

        }))
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        await addSubscription(formData);
        await fetchSubscriptions();
        setFormData({
            name: '',
            price: '',
            frequency: 'Daily',
            startDate: new Date().toISOString().split("T")[0],
            sendEmailReminder: true
        })
        
    }


    return (
        <div className='add-subscription'>
            <h2>Add subscription:</h2>
            <form onSubmit={handleSubmit} action="">
                <div className='add-subscription__input'>
                    <label htmlFor="">Subscription name:</label>
                    <input onChange={(e) => handleChange(e)} value={formData.name} type="text" minLength='2' maxLength='100' required name='name' placeholder='subscription name' />

                </div>
                <div className='add-subscription__input'>
                    <label htmlFor="">Price:</label>
                    <input onChange={(e) => handleChange(e)} id='price' value={formData.price} type="number" min='1' required name='price' placeholder='price' />

                </div>
                <div className='add-subscription__input'>
                    <label htmlFor="">Payment frequency:</label>
                    <select onChange={(e) => handleChange(e)} name="frequency" value={formData.frequency} id="">
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                </div>
                <div className='add-subscription__input'>
                    <label htmlFor="">Start date:</label>
                    <input onChange={(e) => handleChange(e)} id='startDate' checked type="date" required value={formData.startDate} name='startDate' min={getMinStartDate(formData.frequency)} max={new Date().toISOString().split('T')[0]} />

                </div>
                <div className="add-subscription__send-email">
                    <input value={formData.sendEmailReminder} onChange={handleChange} id='send-email' checked={formData.sendEmailReminder} type="checkbox" name='sendEmailReminder' />
                    <label htmlFor="send-email">Send email reminder</label>
                </div>
                <p>By clicking 'add sub' you agree to the terms and conditions.<br />Click <span onClick={()=>setViewTerms((prev)=>!prev)} id='read-terms'>here</span> {!viewTerms?'to read': "to hide"}</p>
                   {viewTerms && 
                          <div className='add-subscriptions__terms'>
                          <p>T&C's</p>
                          <p className='add-subscriptions__conditions'>By selecting send email reminders you agree to receive email reminders to notify you on upcoming subscriptions. If you plan to cancel the reminder please remove the subscription on the 'View Subs" page. Thank you</p>
                      </div>
                        }
                <button>Add Sub</button>
            </form>
        </div>
    )
}

export default AddSubscription