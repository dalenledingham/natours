/* eslint-disable */
// import axios from 'axios';
import { showAlert } from './alerts';

// type is 'data' or 'password'
export const updateSettings = async (data, type) => {
    try {
        const url =
            type === 'password'
                ? 'http://127.0.0.1:3000/api/v1/users/update-my-password'
                : 'http://127.0.0.1:3000/api/v1/users/update-me';

        const res = await axios({
            method: 'PATCH',
            url,
            data: data,
        });

        if (res.data.status === 'success') {
            showAlert(
                'success',
                `${
                    type.charAt(0).toUpperCase() + type.slice(1)
                } updated successfully`
            );
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};
