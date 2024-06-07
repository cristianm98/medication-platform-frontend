import axios from "axios";
import {HOST} from "../../commons/hosts";

const API_URL = HOST.backend_api + "/medication_plan";

class MedicationPlanService {

    create(medication_plan) {
        return axios.post(API_URL + '/create', medication_plan);
    }

    getAll() {
        return axios.get(API_URL + '/getAll');
    }

    getByPatient(id) {
        return axios.get(API_URL + '/getByPatient/' + id);
    }

    updateById(id, medication_plan) {
        return axios.put(API_URL + '/updateById/' + id, medication_plan);
    }

    deleteById(id) {
        return axios.delete(API_URL + '/deleteById/' + id);
    }
}
export default new MedicationPlanService();