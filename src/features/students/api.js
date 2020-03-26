import axios from 'axios';
import {backendIp} from '../../../app.json';

export const getStudents = async () => {
    try {
        let users = await axios.get(`${backendIp}/users`, {
            timeout: 2000,
        });
        return users.data;
    } catch (e) {
        throw Error(e.message);
    }
};

export const createStudent = async (student) => {
    try {
        let res = await axios.post(`${backendIp}/users/create`, {
            ...student,
        }, {
            timeout: 2000,
        });
        return res.data;
    } catch (e) {
        throw Error(e.message);
    }
};

export const getStudentDetails = async (_id) => {
    try {
        let res = await axios.get(`${backendIp}/users/${_id}?payments=true`, {
            timeout: 2000,
        });
        return res.data;
    } catch (e) {
        throw Error(e.message);
    }
};

export const getUnpaidSessions = async (studentId) => {
    try {
        let res = await axios.get(`${backendIp}/users/${studentId}/unpaidSessions`);
        return res.data;
    } catch (e) {
        throw Error(e.message);
    }
};
/*
* payment takes studentId, array of sessions' ids, amount, payment date
* */
export const addPayment = async (data) => {
    try {
        let res =  await axios.post(`${backendIp}/users/addPayment`, {
            ...data,
        });
        return res.data;
    } catch (e) {
        throw Error(e.message);
    }
};
