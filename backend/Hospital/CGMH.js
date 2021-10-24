//林口長庚

const axios = require('axios')
const cheerio = require('cheerio')
var urlencode = require('urlencode')

module.exports = {
    Hosp: async function (url) {
        var data = {
            id: new Array(), //診間
            current: new Array(), //目前看診號
            doctor: new Array(),  //醫生
            subject: new Array()  //科別
        }
        await axios.get(url)
            .then((res) => {
                const $ = cheerio.load(res.data)
                $('tr').each(function (i, elem) {
                    if (i !== 0) {
                        var temp = $(elem).children('td').first().next().text().split('\n')
                        var id = temp.join('')
                        temp = id.split(' ')
                        id = temp.join('')
                        data.id.push(id)
                        data.current.push($(elem).children('td').last().text())
                        data.doctor.push($(elem).children('td').last().prev().text())
                        data.subject.push($(elem).children('td').first().text())
                    }
                })
                data.id.pop()
                data.current.pop()
                data.doctor.pop()
                data.subject.pop()
            }).catch(function (e) {
                console.log(e);
            });
        return data
    }
}