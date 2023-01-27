import axios from 'axios'


class postService{
    getAllPosts(){
        return axios.get('http://localhost:5000/posts/');
    }

    createPost(post){
        return axios.post('http://localhost:5000/posts/',post);
    }
}

export default new postService();