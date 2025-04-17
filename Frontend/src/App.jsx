import React from 'react'
import './/scss/styles.scss'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddSubscription from './pages/AddSubscription';
import Subscriptions from './pages/Subscriptions';
import MyProvider from './context/Context';

const App = () => {
  return (
    <MyProvider>
    <div className='app'>
      <Navbar/>
      <main>
        <Routes>
          <Route path='/'index element={<Home/>}/>
          <Route path='/login'  element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/subscriptions/add' element={<AddSubscription/>}/>
          <Route path='/subscriptions' element={<Subscriptions/>}/>
        </Routes>
     
      </main>
      <Footer/>
         </div>
         </MyProvider>
  )
}

export default App