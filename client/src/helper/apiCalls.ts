import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
const token = sessionStorage.getItem('token');
const BASE_URL = 'http://localhost:8080';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        Authorization: `Bearer ${token}`,
    }
})
// Make API Requests

// Authenticate Function 
export const authenticate = async (username: string): Promise<any> => {
    try{
        const response =  await axiosInstance.post('/users/authenticate', 
            { username: username }
        );
        return response;
    } catch (error){
        return {error: "unable to complete authenticate api call"}
    }
}

// Get QuizData 
export const getQuizData = async (quizId: string): Promise<any> => {
    try{
        const response =  await axiosInstance.post('/quiz/getQuiz', 
            { quizId: quizId }
        );
        return response;
    } catch (error){
        return {error: "unable to complete getQuizData apiCall"}
    }
}

// Get Quiz Answers
export const getQuizAnswers = async (quizId: string): Promise<any> => {
    try{
        const response =  await axiosInstance.post('/quiz/getQuizAnswers', 
            { quizId: quizId }
        );
        return response;
    } catch (error){
        return {error: "Quiz Answers does not exist"}
    }
}

// Get QuizAttempts
export const getQuizAttempts = async (username: string) => {
    try{
        const response =  await axiosInstance.get('/quiz/getQuizAttempts')
        return response;
    } catch (error){
        return {error: "Unable to complete get Quiz Attempts api call"}
    }
}

// Register User
export const registerUser = async (username: string, password: string, email: string): Promise<any> => {
    try{
        const response =  await axiosInstance.post('/users/register', 
            { username: username,
              password: password,
              email: email,
            }
        );
        return response;
    } catch (error){
        return {error: "Unable to complete register user api call"}
    }
}

// Login User 
export const loginUser = async ( values: {username: string, password: string}): Promise<any> =>{
    try{
        const response =  await axiosInstance.post('/users/register', 
            { username: values.username,
              password: values.password,
            }
        );
        return response;
    } catch (error){
        return {error: "Unable to complete register user api call"}
    }
}
// Log Quiz Attempt
export const logQuizAttempt = async (userId: string, quizId: string, score: number): Promise<any> => {
    try{
        const response =  await axiosInstance.post('/users/register', 
            { userId: userId, 
              quizId: quizId,
              score: score,
            }
        );
        return response;
    } catch (error){
        return {error: "Unable to complete log quiz attempt api call"}
    }
}