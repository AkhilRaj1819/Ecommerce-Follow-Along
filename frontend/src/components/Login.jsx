import React, { useState } from 'react'
import './Login.css'

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    function handelInput(e){
        setLoginData({...loginData, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(loginData.email === ''){
            alert('Please enter email')
            return;
        }
        if(loginData.password === ''){
            alert('Please enter password')
            return;
        }
        alert('You successfully logged in');
    }   

  return (
    <div>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
            <div className='email-div'>
                <label htmlFor=''>Email</label>
                <input type="email" value={loginData.email} name='email' onChange={handelInput} placeholder="Enter your email" />
            </div>
            <div className='password-div'> 
                <label>Password</label>
                <input type="password" value={loginData.password} name="password" onChange={handelInput} placeholder="Enter your password" />
            </div>
            <div className='submit-div'>
            <button type="submit" className='submit'>Login</button>
            </div>
        </form>
    </div>
  )
}


export default Login