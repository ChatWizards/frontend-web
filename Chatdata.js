const profile = {
    username:"John Doe",
    fname:"John",
    lname:"Doe",
    email:"johndoe@gmail.com",
    password:"1234567890",
    doB:"09-01-2013",
    profilePic:"user1.jpg",
    user_id:"134567890"
}

const message = (type,message,user_id,profilePic,time) => {
    return{
        profilePic:"user2.jpg",
        userType:type,
        message:message,
        profilePic:profilePic,
        user_id:user_id,
        iat:time
    }
}

const chat = {
    user1:{user_id:profile.user_id,chat:message("primary","hi!","1234567890",profile.profilePic,Date.now())},
    "1234567890":{user_id:"1234567890",chat:message("primary","hi!","134567890",profile.profilePic,Date.now())}
}