import axios from 'axios';
import {backendIp} from '../../../app.json';

export const getGroups = async () => {
    try {
        let response = await axios.get(`http://${backendIp}:3000/groups`);
        return response.data;
    } catch (e) {
        throw Error(e.message);
    }
};

export const getGradeUsers = async (gradeId) => {
    try {
        let students = (await axios.get(`http://${backendIp}:3000/users?grade=${gradeId}`)).data;
        return students
    } catch (e) {
        throw Error(e.message);
    }
};
