export const checkLogin =() =>{
    const userId = localStorage.getItem('userId') || 'default_user';
    if (userId !== 'default_user'){
        return true;
    } else return false;
}
