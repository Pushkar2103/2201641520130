import axios from "axios";

let token = null;

export const setToken = (newToken) => {
    token = newToken;
};

export async function Log(stack, level, packageName, message) {
    if(!token) {
        return;
    }

    const payload = {
        stack,
        level,
        package: packageName,
        message
    };

    try {
        await axios.post('http://20.244.56.144/evaluation-service/logs', payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    }
    catch (error) {
        return;
    }
}