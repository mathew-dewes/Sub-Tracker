import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {



  return (
    <div className='home'>
      <div className="home__message">
        <h2>Welcome to Sub Tracker</h2>
        <p>Thank you for taking the time to check out my subscription tracker app.</p>
        <p>Please register or sign in to begin adding subscriptions.</p>

        <div className='home__message-buttons'>
          <Link to={'/login'}><button>Login</button></Link>
          <Link to={'/register'}><button>Sign up</button></Link>

        </div>

      </div>
      <div className="home__features">
        <h3>Features:</h3>
        <div className='home__features-container'>
          <div>
            <p className='home__feature-titles'>Secure Account Management</p>
            <p>Your passwords are encrypted using hashing and all sessions are managed with secure session tokens.</p>

          </div>
          <div>
            <p className='home__feature-titles'>Fully Persistent Data</p>
            <p>All your data is stored securely in a MongoDB database, accessed through custom-built Node.js APIs.</p>

          </div>
          <div>
            <p className='home__feature-titles'>Smart Email Reminders</p>
            <p>Get notified via email before your renewal dates, thanks to integrated active workflows.</p>

          </div>
          <div>
            <p className='home__feature-titles'>Backend Security</p>
            <p>Rate limiting and bot protection are enabled on all API routes to ensure performance and safety.</p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home