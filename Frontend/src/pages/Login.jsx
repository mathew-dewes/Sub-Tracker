import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useMyContext } from '../context/MyContext'

const Login = () => {
      const {signIn} = useMyContext();

    const [data, setData]=useState({
        email: '',
        password:''
    });

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setData((prev) =>({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await signIn(data);
        setData({
            email: '',
            password:''
        })
        
    }


  return (
    <div className='login'>
        <h2>Login:</h2>
        <form onSubmit={handleSubmit} action="">
            <div className="login__inputs">
                <label htmlFor="">Email:</label>
                <input onChange={(e)=>handleChange(e)} value={data.email} type="email" required placeholder='Email Address' name='email' />
                <label htmlFor="">Password:</label>
                <input onChange={(e)=>handleChange(e)} value={data.password} type="password" required placeholder='Password' name='password' />
            </div>
            <div className="login__buttons">
                <button>Login</button>
                <Link to={'/register'}><button>Sign up</button></Link>
            
            </div>
        </form>
    </div>
  )
}

export default Login