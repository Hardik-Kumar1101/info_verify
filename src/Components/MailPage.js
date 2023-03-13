import './MailPage.css'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

var List = []
const MailPage = () => { 
    const underAgeValidate = (birthday)=>{
    let optimizedBirthday = birthday.replace(/-/g, "/");
    let myBirthday = new Date(optimizedBirthday);    
    let currentDate = new Date().toJSON().slice(0,10)+' 01:00:00';
    let myAge = ~~((Date.now(currentDate) - myBirthday) / (31557600000));
    
        if(myAge < 18) {
                 return false;
            }else{
            return true;
        }
    
    } 
    const [allvalue, setAllvalue] = useState({
        userName: "",
        userDob: "",
        userEmail: "",
        userPhNo:"",
        status:false
    });

    const { userName, userDob, userEmail, userPhNo, status } = allvalue;

    const navigate = useNavigate();


    const handleChange = name => (event) => {
        setAllvalue({...allvalue, [name]: event.target.value});
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(userPhNo.length === 10 && underAgeValidate(userDob)){
        try{ 
            await axios.post('/sms', {
                userPhNo,
            }).then((res) => {
                console.log(res.data);
                const flag = res.data;
                if(flag){
                    toast.success('Please Verify Your OTP');
                    createPost({userName, userDob, userEmail, userPhNo, status});
                }else{
                    toast.error('Phone number is Invalid');
                }
                
                });
                
        }catch(error){
            console.log(error);
        }}
        else{
            toast.error('Please Check your Phone number or Brith of Date');
        }

    }

    const createPost = (item)=> {
        navigate('/Verify',
            {
                state: {
                    data:item
                }
            });
    }

    return (
        <>
        
        {/* <a href='/List'  id="backtohome">
            Show List
        </a> */}

        <form className='inputform'>
            <label>
                Name:<br/>
                <input type="text" placeholder='Enter your Name' value={userName} onChange={handleChange('userName')}/>
            </label>
            <br/><br/>
            <label>
                Date of Birth:<br/>
                <input type="Date" value={userDob} onChange={handleChange('userDob')} />
            </label>
                <br/><br/>
            <label>
                Email:<br/>
                <input type="text" placeholder='Enter your Email Address' value={userEmail} onChange={handleChange('userEmail')}/>
            </label>
            <br/><br/>
            <label>
                Phone Number:<br/>
                <input type="text" placeholder='Enter your Phone Number' value={userPhNo} onChange={handleChange('userPhNo')}/>
            </label>
            <br/><br/>
            <button type='submit' onClick={handleSubmit}>Submit</button>
        </form>
        
        </>
    )
}   

export default MailPage