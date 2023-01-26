import axios from 'axios'


class postService{
    getAllPosts(){
        return axios.get('http://localhost:5000/posts/');
    }
}

export default new postService();