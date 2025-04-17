import React, {useState} from 'react'
import {NavLink} from 'react-router-dom';
import { useMyContext } from '../context/MyContext'

const Navbar = () => {
const {logout, isLoggedIn} = useMyContext();
  const [toggleMenu, setToggleMenu] = useState(true);
  const screenWidth = window.innerWidth;


  const toggle= ()=>{

    
    if (screenWidth < 699.98){
      setToggleMenu(false)
      setToggleMenu(prev => !prev);
    } else{
      setToggleMenu(true)
    }
  }

  return (
 <nav className='navbar'>
       <h2>Sub Tracker</h2>
        {isLoggedIn && <div>
          <ul className={toggleMenu?"navbar__menu": "navbar__menu activated"}>
          <li onClick={()=>toggle()} className="navbar_menu-item">
          <NavLink to={'/subscriptions/add'}  className='navbar__link' href='#'>Add subscription</NavLink>
          </li>
          <li onClick={()=>toggle()} className="navbar_menu-item">
          <NavLink to={'/subscriptions'}  className='navbar__link' href='#'>View subscriptions</NavLink>
          </li>
          <li onClick={()=>{toggle(), 
            logout()}} className="navbar_menu-item">
          <NavLink className='navbar__link' href='#'>Logout</NavLink>
          </li>
         
        </ul>
        <div onClick={()=>{setToggleMenu(prev => !prev)}} className={toggleMenu?"hamburger": "hamburger active"}>
          <span className='bar'></span>
          <span className='bar'></span>
          <span className='bar'></span>
        </div>
        </div>
        
        }
      
   
   


 </nav>
  )
}

export default Navbar