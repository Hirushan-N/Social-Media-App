import axios from 'axios'


class userService{
    login(loginRequest){
        return axios.post('http://localhost:5000/users/login',loginRequest);
    }

    signUp(user){
        return axios.post('http://localhost:5000/users/signup',user);
    }
}

export default new userService();