import React, {useState} from 'react';
import axios from 'axios';
import './Signup.css';


const Signup = () =>{
    const [userDetail, setUserDetail] = useState({
        name: '',
        email: '',
        password: ''
});
    function handelInput(event){
        console.log(event.target.value);
        setUserDetail({...userDetail,[event.target.value]:event.target.value});

    }
    async function handelSubmit(){
        try{
            if(userDetail.name == ''){
                alert('Please enter your name')
                return;
            }
            if(userDetail.email == ''){
                alert('Please enter your email')
                return;
            }
            if(userDetail.password == ''){
                alert('Please enter your password')
                return;
            }
            const data= await axios.post("https://localhost:8000/user/signup");
            console.log(data);
            alert('signup successful')

        }catch(err){
            console.log(err);
            alert('something went wrong')
        }

    }
    return (
        <div className='signup'>
            <h1>Sign up</h1>
            <form action="" onSubmit={handelSubmit}>
            <label htmlFor=''>Name</label>
            <input type='text' name='name' placeholder='Name...' onChange={handelInput}/>
            <label htmlFor=''>Email</label>
            <input type='email' name='email' placeholder='Email...' onChange={handelInput}/>
            <label htmlFor=''>Password</label>
            <input type='password' name='password' placeholder='Password...' onChange={handelInput} />
            <input type='submit' />
            </form>
        </div>
    )
}
export default Signup;