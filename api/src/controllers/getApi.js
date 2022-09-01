const Axios = require('axios');


module.exports = async function getApi(){
    try {
        const res = await Axios.get('https://api.thedogapi.com/v1/breeds');
        const info = await res.data.map((d) => {
            return{
                id: d.id,
                name: d.name,
                height: d.height.metric,
                weight: d.weight.metric,
                life_span: d.life_span,
                image: d.image.url,
                temperament: [d.temperament].join().split(',').map((t) => t.trim())
            }
        });
        return info;
    } catch (error) {
        console.log(error);
    };
};