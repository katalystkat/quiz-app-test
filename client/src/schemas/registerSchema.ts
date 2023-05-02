import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
    email: Yup.string()
        .label('Email')
        .required(),
    username: Yup.string()
        .label('Username')
        .required(),
    password: Yup.string()
        .label('Password')
        .min(8, 'You need a longer password!')
        .required(),
})