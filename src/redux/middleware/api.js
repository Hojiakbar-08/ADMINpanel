import axios from "axios";

const api = ({dispatch}) => (next) => (action) => {
    if (action.type !== "api/apiCall") {
        next(action)
        return;
    }

    const {url, method, data, onSuccess, onFail, id} = action.payload;

    axios({
        baseURL: 'http://localhost:8080/',
        url,
        method,
        data,
    }).then((res) => {
        dispatch({
            type: onSuccess,
            payload: res.data,
            id
        })
    }).catch((err) => {
        dispatch({
            type: onFail,
            payload: err
        })
    })
}


export default api;