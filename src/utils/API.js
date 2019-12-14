import axios from "axios";

export default {
    getImages: function() {
        return axios.get("https://api.unsplash.com/search/photos?query=minimal")
        // return axios.get("https://api.unsplash.com/photos?random?count=5")
    }
}