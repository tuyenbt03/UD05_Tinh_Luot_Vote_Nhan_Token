import axios from "axios";

const API = "http://localhost:5000/interactPost";
class InteractPostService {
    // get all
    static getPosts() {
        return axios.get(API);
    }

    // detail
    static getById(id) {
        return axios.get(`${API}/${id}`);
    }
    // find postId - userId
    static getByPostIdAndUserId(postId, userId) {
        return axios.get(`${API}?postId=${postId}&userId=${userId}`);
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

export default InteractPostService;
