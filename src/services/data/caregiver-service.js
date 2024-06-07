import axios from "axios";
import {HOST} from "../../commons/hosts";

const API_URL = HOST.backend_api + "/caregivers";

class CaregiverService {

    create(caregiver) {
        return axios.post(API_URL + '/create', caregiver);
    }

    getAll() {
        return axios.get(API_URL + '/getAll');
    }

    getById(id) {
        return axios.get(API_URL + '/getById/' + id);
    }

    getByUsername(username) {
        return axios.get(API_URL + '/getByUsername/' + username);
    }

    updateById(id, caregiver) {
        return axios.put(API_URL + '/updateById/' + id, caregiver);
    }

    updateByUsername(username, caregiver) {
        return axios.put(API_URL + '/updateByUsername/' + username, caregiver);
    }

    deleteByUsername(username) {
        return axios.delete(API_URL + '/deleteByUsername/' + username);
    }

    deleteById(id) {
        return axios.delete(API_URL + '/deleteById/' + id);
    }

}
export default new CaregiverService();