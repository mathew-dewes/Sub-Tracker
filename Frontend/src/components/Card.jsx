import React from 'react'
import dayjs from 'dayjs'

const Card = ({ name, price, frequency, renewalDate, deleteSubscription, id }) => {
    return (

        <div className='card'>
            <p>Name: {name}</p>
            <br />
            <p>Price: ${price} ({frequency})</p>
            <p>Renewal Date: {dayjs(renewalDate).format('DD/MM/YY')}</p>
            <button onClick={() => deleteSubscription(id)}>Remove</button>
        </div>

    )
}

export default Card