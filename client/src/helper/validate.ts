import toast from 'react-hot-toast'

/** validate login page username */
export const usernameValidate = (values: any) =>{
    const errors = usernameVerify({ username: "string", password: "string", email: "string" }, values);
    return errors;
}

export const passwordValidate = (values: any) =>{
    const errors = passwordVerify({username: "string", password: "string", email: "string"}, values);
    return errors;
}

export const registerValidate = (values: any) => {
    const errors = usernameVerify({username: "string", password: "string", email: "string"}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);
    return errors;   
}
/** validate username */
export const usernameVerify = (error= {username: "", password: "", email:""}, values: any) =>{
    if(!values.username){
        error.username = toast.error('Username Required');
    } else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username')
    }
    return error;
}

/** validate email */
export const emailVerify = (error ={username: "string", password: "string", email: "string"}, values: any) =>{
    if (!values.email){
        error.email = toast.error('Email required for signup!');
    } else if (values.email.includes(" ")){
        error.email = toast.error('Invalid Email')
    }
    return error;
}

/** validate password */
export const passwordVerify = (error = {username: "string", password: "string", email: "string"}, values: any) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(!values.password){
        error.password = toast.error('Password Required');
    } else if(values.password.includes(" ")){
        error.password = toast.error("Password contains a space");
    } else if(values.password.length < 8){
        error.password = toast.error("Password needs to be at least 8 chars long");
    } else if (!specialChars.test(values.password)){
        error.password = toast.error("Password must have a special character");
    }

    return error;
}