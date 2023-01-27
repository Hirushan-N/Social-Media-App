import axios from 'axios'


class postService{
    getAllPosts(authToken){
        return axios.get('http://localhost:5000/posts/',{ headers: {"Authorization" : `Bearer ${authToken}`} });
    }

    createPost(post,authToken){
        return axios.post('http://localhost:5000/posts/',post,{ headers: {"Authorization" : `Bearer ${authToken}`} });
    }
}

export default new postService();