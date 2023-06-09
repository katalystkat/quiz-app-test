import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
})

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

export const getQuizData = async (quizId: string): Promise<any> => {
    try {
      const response = await axiosInstance.get('/quiz/getQuiz', {
        params: {quizId: quizId}
      });
      return response.data;
    } catch (error) {
      return { error: "unable to complete getQuizData apiCall" };
    }
};

export const getQuizAnswers = async (quizId: string): Promise<any> => {
    try{
        const response =  await axiosInstance.get('/quiz/getQuizAnswers',{ 
            data: {quizId: quizId}
     });
        return response;
    } catch (error){
        return {error: "Quiz Answers does not exist"}
    }
}

export const registerUser = async (values: {username: string, password: string, email: string}): Promise<any> => {
    try{
        const response =  await axiosInstance.post('/users/register', 
            { username: values.username,
              password: values.password,
              email: values.email,
            }
        );
        return response;
    } catch (error){
        return {error: "Unable to complete register user api call"}
    }
}

export const loginUser = async ( values: {username: string, password: string}): Promise<any> =>{
    try{
        const response =  await axiosInstance.post('/auth/login', 
            { username: values.username,
              password: values.password,
            }
        );
        return response;
    } catch (error){
        return {error: "Unable to complete register user api call"}
    }
}

export const logoutUser = async (): Promise<any> =>{
    try{
        const response =  await axiosInstance.post('/auth/logout')
        return response;
    } catch (error){
        return {error: "Unable to complete logout user api call"}
    }
}

export const logQuizAttempt = async (userId: string, quizId: string, score: number): Promise<any> => {
    try{
        const response =  await axiosInstance.post('/quiz/addQuizAttempts', 
            { userId: userId,  
              quizId: "1",
              score: score,
            }
        );
        return response;
    } catch (error){
        return {error: "Unable to complete log quiz attempt api call"}
    }
}

export const getQuizAttempts = async (username: string) => {
    try{
        const response =  await axiosInstance.get('/quiz/getQuizAttempts')
        return response.data;
    } catch (error){
        return {error: "Unable to complete get Quiz Attempts api call"}
    }
}