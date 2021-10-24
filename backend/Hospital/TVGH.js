//台中榮總

const axios = require('axios')
const cheerio = require('cheerio')
var urlencode = require('urlencode')

module.exports = {
    Hosp: async function (url, name) {
        var data = {
            id: new Array(), //診間
            current: new Array(), //目前看診號
            doctor: new Array(),  //醫生
            subject: new Array()  //科別
        }

        await axios.get(url)
            .then((res) => {
                const $ = cheerio.load(res.data)
                $('.order-1').each(function (i, elem) {
                    data.doctor.push($(elem).text())
                })

                $('.order-2').each(function (i, elem) {
                    var temp = $(elem).text().split('\n')
                    var id = temp.join('')
                    temp = id.split(' ')
                    id = temp.join('')                    
                    data.id.push(id)
                })
                $('.order-3').each(function (i, elem) {
                    data.current.push($(elem).text())
                })
                data.subject.push(urlencode.decode(name, 'utf8'))
            }).catch(function (e) {
                console.log(e);
            });
        return data
    }
}