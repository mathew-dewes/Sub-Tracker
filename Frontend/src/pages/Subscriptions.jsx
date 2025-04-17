import React from 'react'
import Card from '../components/Card'
import { useMyContext } from '../context/MyContext'

const Subscriptions = () => {
  const {subscriptions, loading, deleteSubscription} = useMyContext();
  
  if (loading) return <p>Loading subscriptions...</p>;
  if (!subscriptions || subscriptions.length === 0) return <p>You have no subscriptions.</p>;
  return (
    <div className='subscription'>
        <h2>Subscriptions:</h2>
        <br />
        <div className='subscription__card-display'>
        {subscriptions.map((sub, index)=>{
          return <Card key={index} id={sub._id} name={sub.name} price={sub.price} renewalDate={sub.renewalDate} frequency={sub.frequency} deleteSubscription={deleteSubscription}/>
        })}
        </div>
       
    </div>
  )
}

export default Subscriptions