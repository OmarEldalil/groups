import axios from 'axios';
import {backendIp} from '../../../app.json';

export const getStudents = async () => {
    try {
        let users = await axios.get(`${backendIp}/users`,{
            timeout:2000
        });
        return users.data;
    } catch (e) {
        throw Error(e.message);
    }
};
