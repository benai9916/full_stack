import axios from 'axios';

export const fetchWeatherData = () => {
    return axios.get(`${process.env.REACT_APP_URL}/api/v1/weather`);
}