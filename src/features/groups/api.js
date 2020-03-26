import axios from 'axios';
import {backendIp} from '../../../app.json';

export const getGroups = async () => {
    try {
        let groups = await axios.get(`${backendIp}/groups`, {
            timeout: 2000,
        });
        return groups.data;
    } catch (e) {
        throw Error(e.message);
    }
};

const grades = {
    'First Year': 1,
    'Second Year': 2,
    'Third Year': 3,
};
export const getGradeUsers = async (gradeId) => {
    try {
        if (!gradeId.match(/\d+/)) {
            gradeId = grades[gradeId];
        }
        let students = await axios.get(`${backendIp}/users?grade=${gradeId}`, {
            timeout: 2000,
        });
        return students.data;
    } catch (e) {
        throw Error(e.message);
    }
};

export const createGroup = async (group) => {
    try {
        let res = await axios.post(`${backendIp}/groups/create`, {
            ...group,
        }, {
            timeout: 2000,
        });
        return res.data;
    } catch (e) {
        throw Error(e.message);
    }
};

export const getGroupDetails = async (groupId) => {
    try {
        let res = await axios.get(`${backendIp}/groups/${groupId}`, {
            params: {
                _id: groupId,
            },
        }, {
            timeout: 2000,
        });
        let group = res.data.group;
        group.sessions = res.data.sessions;
        return group;
    } catch (e) {
        throw Error(e.message);
    }
};

export const addSessionToGroup = async (session) => {
    try {
        let res = await axios.post(`${backendIp}/groups/addSession`, {
            ...session,
        }, {
            timeout: 2000,
        });
        return res.data;
    } catch (e) {
        throw Error(e.message);
    }
};

export const addMoreStudentsToGroup = async (data) => {
    try {
        let res = await axios.put(`${backendIp}/groups/addStudents`, {
            ...data,
        }, {
            timeout: 2000,
        });
        return res.data;
    } catch (e) {
        throw Error(e.message);
    }
};
