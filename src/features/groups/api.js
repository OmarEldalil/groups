import axios from 'axios';
import {backendIp} from '../../../app.json';

export const getGroups = async () => {
    try {
        let groups = await axios.get(`${backendIp}/groups`,{
            timeout: 2000
        });
        return groups.data;
    } catch (e) {
        throw Error(e.message);
    }
};

export const getGradeUsers = async (gradeId) => {
    try {
        let students = await axios.get(`${backendIp}/users?grade=${gradeId}`);
        return students.data
    } catch (e) {
        throw Error(e.message);
    }
};
