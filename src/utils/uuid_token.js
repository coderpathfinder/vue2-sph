import {v4 as uuidv4} from 'uuid';

export const getUUID = () => {
    let uuid_token = localStorage.getItem("APP_UUID_TOKEN");
    if(!uuid_token) {
        uuid_token = uuidv4();
        localStorage.setItem('APP_UUID_TOKEN', uuid_token);
    }
    return uuid_token;
} 