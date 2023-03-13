const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const cors = require('cors');

var sid = "AC7d79d51e8a5d808c697efcef87844fd7"
var token = "7e1be5e3c79996366e26761fa7745864"
const twilio = require('twilio')(sid, token);

app.use(express.json());
// app.use(cors({origin: process.env.ORIGIN, credentials:process.env.CREDENTIALS}));

const server = http.createServer(app);

app.use(express.static('build'));
app.get('/',cors(), (req, res, next) => {
    res.sendFile(path.join(__dirname ,'build','index.html'));
});

userList = [];

var OTP = 0

app.post('/sms', async (req, res) => {
    OTP = Math.floor(1000 + Math.random() * 9000);
    let phone = req.body.userPhNo 
    console.log("check phone number:",phone)
    twilio.messages.create({
        from:'+15673393551' ,
        to: '+91'+phone,
        body: "This is your OTP: " + OTP
    }).then((r) => 
        // console.log(r.sid)
        res.send(true)
    ).catch((err) => 
        // console.error(err)
        res.send(false)
    )
    
    console.log("get number" , phone);
    
})    

// reciving requests from client
app.post('/post_name', async (req, res) => {
    username = req.body.Name;
    userDob = req.body.Dob;
    userEmail = req.body.Email;
    userPhNo = req.body.PhNo;
    userstatus = req.body.status;
    userOTP = req.body.otp;
    
    console.log('this is your OTP:',userOTP)
    if(userOTP == OTP){
        userstatus = true;    
        userList.push({name:username,
                       dob:userDob,
                       email:userEmail,
                       phno:userPhNo.slice(0,-2)+"**",})
        
        console.log("THis is userList fromt server:",userList);
        res.send({userstatus,userList});
    }else{
        let userstatus = false;
        let userList = [];
        res.send({userstatus, userList});
    }

});



const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
