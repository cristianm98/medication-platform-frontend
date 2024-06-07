import axios from "axios";
import {HOST} from "../../commons/hosts";

const API_URL = HOST.backend_api + "/medications";

class MedicationService {

    create(medication) {
        return axios.post(API_URL + '/create', medication);
    }

    getAll() {
        return axios.get(API_URL + '/getAll');
    }

    getById(id) {
        return axios.get(API_URL + '/getById/' + id);
    }

    updateById(id, medication) {
        return axios.put(API_URL + '/updateById/' + id, medication);
    }

    deleteById(id) {
        return axios.delete(API_URL + '/deleteById/' + id);
    }
}
export default new MedicationService();