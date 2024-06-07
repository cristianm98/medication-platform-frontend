import {HOST} from "../commons/hosts";
import RestApiClient from "../commons/api/rest-client"

const endpoint = {
    users: 'users'
};

function getUserByUsername(params, callback) {
    let request = new Request(HOST.backend_api + endpoint.users, {
        method: 'GET'
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getUserByUsername
};