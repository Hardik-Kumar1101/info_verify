import React,{ useState } from "react";
import { useLocation } from "react-router-dom";
import './VerifyOPT.css'
import toast from 'react-hot-toast';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';


var List = []
const VerifyOTP =()=>{

    const [otp, setOtp] = useState("");
    const {state} = useLocation();
    const navigate = useNavigate();
    
    const Name = state.data.userName;
    const Email = state.data.userEmail;
    const Dob = state.data.userDob;
    const PhNo = state.data.userPhNo;
    const status = state.data.status;

    const handleVerifyOtpSubmit = async (e) => {
        e.preventDefault();

        try{ 
            await axios.post('/post_name', {
                Name,
                Dob,
                Email,
                PhNo,
                status,
                otp,
            }).then((res) => {
                console.log(res.data);
                if(res.data.userstatus === true){
                    toast.success('OPT Verified Successfully');
                    console.log("this is from verify.js for res.data.userList:",res.data.userList)
                    ListPost(res.data.userList);
                }else{
                    toast.error('Invalid OTP');
                }
                
            })

        }catch(error){
            console.log(error);
        }
    }

    const ListPost = (item)=> {
        navigate('/List',
            {
                state: {
                    data:item
                }
            });
    }
    

    return(
        <>
            <form className="otpverifybox">

                <h1>Enter your OTP</h1>
                <input type="text" placeholder="OTP" value ={otp} onChange={e => setOtp(e.target.value)} />
                <br/>
                <button onClick={handleVerifyOtpSubmit}  >Click</button>
            </form>
        </>
    )
}
export default VerifyOTP;
