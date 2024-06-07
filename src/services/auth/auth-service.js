import axios from "axios";
import {HOST} from "../../commons/hosts";

const API_URL = HOST.backend_api + "/auth/";

class AuthService {
    login(username, password) {
        return axios.post(API_URL + "signin", {
            username,
            password
        }).then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    registerPatient(patient){
        return axios.post(API_URL + "signup/patient", {
            username: patient.username,
            password: patient.password,
            name: patient.name,
            gender: patient.gender,
            birthDate: patient.birthDate,
            address: patient.address,
            caregiver_id: patient.caregiver_id
        });
    }

    registerCaregiver(caregiver) {
        return axios.post(API_URL + "signup/caregiver", {
            username: caregiver.username,
            password: caregiver.password,
            name: caregiver.name,
            gender: caregiver.gender,
            birthDate: caregiver.birthDate,
            address: caregiver.address
        });
    }

    registerDoctor(doctor) {
        return axios.post(API_URL + "signup/doctor", {
            username: doctor.username,
            password: doctor.password,
            name: doctor.name,
            birthDate: doctor.birthDate,
            address: doctor.address
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();