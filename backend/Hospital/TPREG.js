//馬偕醫院

var qs = require('qs')
const axios = require('axios')
const cheerio = require('cheerio')

module.exports = {
    //cboap:午別 cboDept:科別
    Hosp: async function (url, cboAp, cboDept) {

        var datares = {
            time: new Array(), //午別
            pos: new Array(),  //位置
            Diagnosis: new Array(), //診別
            doctor: new Array(), //醫師
            current: new Array(), //目前看診號
            nonCurrent: new Array() //未看診人數
        }

        /* #region  第一次訪問 先取得form-data */

        var form_data = {
            'cboAp': cboAp,
            'cboDept': cboDept,
            'btnQuery': '查詢',
            '__VIEWSTATE': '',
            '__VIEWSTATEGENERATOR': '',
            '__EVENTVALIDATION': ''
        }

        var config = {
            method: 'get',
            url: 'https://tpreg.mmh.org.tw/OpdProgress.aspx',
            headers: {
                'Cookie': ' ASP.NET_SessionId=5m34gxmz2vzlgiktzyjsy30a; mmh-cookie=380847563.47873.0000; TS01f2741f=01207414eb9289cd783fcc3e97a5664e5430d0de6c27d37229cac3b1b776461afe418b709012e7ce4e39c7c3e0a91bd5d7ae4dff7b83ea8f700b0a8966f22bbc3c8ef0d903dd99aac486b9da04bfd8e6e39f8084ee; TS01f2741f=01207414ebbfcd68c8342b5c05589d31118bf24075fa7bfaf6d61ebef94b7af11b0e8d90ec5f8b4012ab11075e59dcfdea93ce281f23f57898d7335b641e4e33e9d72f3c288b3b71ba30198cf63303897fde0e0afe',
                'Host': ' tpreg.mmh.org.tw'
            }
        };

        await axios(config)
            .then(function (response) {
                const $ = cheerio.load(response.data)
                form_data['__VIEWSTATE'] = $('#__VIEWSTATE').attr('value')
                form_data['__VIEWSTATEGENERATOR'] = $('#__VIEWSTATEGENERATOR').attr('value')
                form_data['__EVENTVALIDATION'] = $('#__EVENTVALIDATION').attr('value')
            })
            .catch(function (error) {
                console.log(error);
            });

        /* #endregion */

        /* #region  第二次訪問 抓取診資料 */
        var config2 = {
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Origin': 'https://tpreg.mmh.org.tw',
                'Refeeferer': 'https://tpreg.mmh.org.tw/OpdProgress.aspx',
                'Cookie': 'ASP.NET_SessionId=ugq0um45nwjrdm55htwzoh55; TS019f1b2d=01207414ebaabbc97f3463d938ae8f2f472c6b4e5b2b85149d66e8c80e065ab3bad868d06c563c3c54a10e9cb7e035a9c4b7b79bfbf6ef111a77f86e4830016f0ad7b58863; mmh-cookie=431179211.47873.0000; TS01f2741f=01207414ebb179b1da03b637108c4a954170f6d9056870f851b7a5124120f4a2ab0ed1d8cd3041739c47fce573b112e695bb90015f521d6aa0fc002c5050be89bd5372866c3e246962f58a88f14846b7886283ddb3'
            },
            data: qs.stringify(form_data)
        };
        await axios(config2)
            .then((response) => {
                const $ = cheerio.load(response.data)
                const table_tr = $('#tblOpdInfo tbody tr')
                for (let i = 1; i < table_tr.length; i++) { // 走訪 tr
                    var table_td = table_tr.eq(i).find('td'); // 擷取每個欄位(td)                
                    datares.time.push(table_td.eq(0).text());
                    datares.pos.push(table_td.eq(1).text());
                    datares.Diagnosis.push(table_td.eq(2).text());
                    datares.doctor.push(table_td.eq(3).text());
                    datares.current.push(table_td.eq(4).text());
                    datares.nonCurrent.push(table_td.eq(5).text());
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        /* #endregion */

        return datares
    }
}