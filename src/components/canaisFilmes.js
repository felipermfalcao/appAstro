import axios from 'axios';
import cheerio from 'react-native-cheerio';

const url = 'https://meuguia.tv/programacao/categoria/Filmes';

const CanaisFilmes = async () => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const programming = [];

        $('li').each((i, li) => {
            const h2 = $(li).find('h2').text();
            const h3 = $(li).find('h3').map((i, h) => $(h).text()).get();
            programming.push({
                h2,
                h3
            });
            });

        //console.log(programming);

        return programming;
    } catch (error) {
        console.error(error);
    }
}

export default CanaisFilmes;
