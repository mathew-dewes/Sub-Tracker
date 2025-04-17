import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useMyContext } from '../context/MyContext'

const Register = () => {
    const navigate = useNavigate();
         const {signUp} = useMyContext();

    const [data, setData]=useState({
        name:'',
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

    const handleSubmit = async(e)=>{
        e.preventDefault();
        await signUp(data);
        setData({
            name:'',
            email: '',
            password:''
        })
        
    }
  return (
    <div className='login'>
        <h2>Sign up:</h2>
        <form onSubmit={handleSubmit} action="">
            <div className="login__inputs">
                <label htmlFor="">Name:</label>
                <input onChange={(e)=>handleChange(e)} value={data.name} type="text" required placeholder='Full name' name='name' />
                <label htmlFor="">Email:</label>
                <input onChange={(e)=>handleChange(e)} value={data.email} type="email" required placeholder='Email' name='email' />
                <label htmlFor="">Password:</label>
                <input onChange={(e)=>handleChange(e)} value={data.password} type="password" required placeholder='Password' name='password' />
            </div>
            <div className="login__buttons">
                <button>Register</button>
            
               
            </div>
            <br />
            <p className='login__message'>Already have an account? Click <span onClick={()=>navigate('/login')} id='login-return'>here</span> to login</p>

         
                   </form>
                   
    </div>
  )
}

export default Register;