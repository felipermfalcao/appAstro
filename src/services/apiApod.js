import axios from 'axios';

const apiApod = axios.create({
    baseURL: 'https://felipefalcao.com.br/appAstro/'
});

export default apiApod;