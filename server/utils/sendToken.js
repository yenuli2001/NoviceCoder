

export const sendToken = (res, user, message) =>{

    const token = user.getJWTToken();

    const options = {
        expires : new Date(Date.now() + 10*24*60*60*1000),
        httpOnly:true,
        secure:true,
        sameSite:"none",
    }

    res.status(201).cookie("token", token, options).json({
        success: true,
        message,
        user,
    })

}