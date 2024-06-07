import axios from "axios";
import {HOST} from "../../commons/hosts";

const API_URL = HOST.backend_api + "/patients";

class PatientService {

    create(patient) {
        return axios.post(API_URL + '/create', patient);
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

    getByCaregiver(id) {
        return axios.get(API_URL + '/getByCaregiver/' + id);
    }

    updateById(id, patient) {
        return axios.put(API_URL + '/updateById/' + id, patient);
    }

    updateByUsername(username, patient) {
        return axios.put(API_URL + '/updateByUsername/' + username, patient);
    }

    deleteByUsername(username) {
        return axios.delete(API_URL + '/deleteByUsername/' + username);
    }

    deleteById(id) {
        return axios.delete(API_URL + '/deleteById/' + id);
    }

}
export default new PatientService();