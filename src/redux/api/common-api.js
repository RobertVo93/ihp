import axios from "axios";
const qs = require("qs");

/**
 * AxiosConfiguration
 */
export const apiConfig = {
    withCredentials: true,
    headers: {
        common: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    },
    paramsSerializer: (params) => qs.stringify(params, {
        indices: false
    })
};

class Api {
    api;

    constructor(config) {
        this.api = axios.create(config);

        this.getUri = this.getUri.bind(this);
        this.request = this.request.bind(this);
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
        this.head = this.head.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.patch = this.patch.bind(this);
    }

    getUri(config) {
        return this.api.getUri(config);
    }

    request(config) {
        return this.api.request(config);
    }

    get(url, config) {
        return this.api.get(url, config);
    }

    delete(url, config) {
        return this.api.delete(url, config);
    }

    head(url, config) {
        return this.api.head(url, config);
    }

    post(url, data, config) {
        return this.api.post(url, data, config);
    }

    put(url, data, config) {
        return this.api.put(url, data, config);
    }

    patch(url, data, config) {
        return this.api.patch(url, data, config);
    }
}

export const commonAPI = new Api(apiConfig);