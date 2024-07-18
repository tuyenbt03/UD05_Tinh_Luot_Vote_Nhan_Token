import axios from "axios";

const API = "http://localhost:5000/posts";
class PostService {
    // get all
    static getPosts() {
        return axios.get(API);
    }

    // detail
    static getById(id) {
        return axios.get(`${API}/${id}`);
    }

    // add
    static add(data) {
        return axios.post(API, data);
    }

    // add
    static update(id, data) {
        return axios.put(`${API}/` + id, data);
    }
}

export default PostService;
