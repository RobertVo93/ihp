import { handleError, handleResponse } from "redux/api/apiUtils";

const axios = require("axios");
export class ReferenceService {
    constructor() {
        this.getByUrl = this.getByUrl.bind(this);
    }

    /**
     * Get data by url
     */
    async getByUrl(url) {
        return axios({
                method: "get",
                url: url
            })
            .then(handleResponse)
            .catch(handleError);
    }
}