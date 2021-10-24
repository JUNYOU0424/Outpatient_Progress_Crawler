//全國診所

var qs = require('qs')
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs');

var txt_obj = {
    'StylesheetManager_TSSM': ' ',
    'ScriptManager_TSM': ';;System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35:en:22727c22-244c-4537-8243-3c42cc5b20e2:ea597d4b:b25378d2',
    '__EVENTTARGET': 'dnn$ctr1089$ViewVNHI_Clinics$mcsModuleCont$ctl00$visClinicList$gvwClinicList',
    '__EVENTARGUMENT': ' ',
    '__VIEWSTATE': ' ',
    '__VIEWSTATEGENERATOR': ' ',
    '__VIEWSTATEENCRYPTED': ' ',
    '__EVENTVALIDATION': ' '
}

var default_header = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Referer': 'https://wroom.vision.com.tw/MainPage/SearchResult.aspx',
    'Origin': 'https://wroom.vision.com.tw',
    'Cookie': 'language=zh-TW; .ASPXANONYMOUS=MeeVia-y1gEkAAAANTY0ZTg0NzQtNWYzNC00YTgzLTliOWEtNjg1YWZlYzlhM2Ez0',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36 Edg/84.0.522.63'
}

var page_header = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Referer': 'https://wroom.vision.com.tw/MainPage/SearchResult.aspx',
    'Origin': 'https://wroom.vision.com.tw',
    'Cookie': 'language=zh-TW; .ASPXANONYMOUS=MeeVia-y1gEkAAAANTY0ZTg0NzQtNWYzNC00YTgzLTliOWEtNjg1YWZlYzlhM2Ez0; language=zh-TW; .ASPXANONYMOUS=LGYATDe11gEkAAAAYmFlMzljMTktZDZmMy00OWRkLWI0MWItMDkwNjliYTVjYzdh0',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36 Edg/84.0.522.6',
}

module.exports = {
    Hosp: async function (url, city, area, type, subj, kstr, page) {
        var datares = {
            Clinic_Name: new Array(), //診所名稱
            Pos: new Array(),  //診所位置
            Pos_Google: new Array(), //診所位置(Google網站)
            Phone_Num: new Array(), //電話號碼            
            Clinic_herf: new Array(), //診所資訊(網頁)
            Page_num: new Array() //頁碼
        }
        var data = qs.stringify({
            'QCity': ((city == '1') ? '' : city),
            'QArea': ((area == '1') ? '' : area),
            'QType': ((type == '1') ? ' ' : type),
            'QSubj': ((subj == '1') ? ' ' : subj),
            'QKStr': ((kstr == '1') ? '' : kstr)
        });

        var data3
        if (page != '1') {
            var rawdata = fs.readFileSync('Hospital/Temp.txt', 'utf-8');
            var data2 = JSON.parse(rawdata);
            data2['__EVENTARGUMENT'] = 'Page$' + page
            data3 = qs.stringify(data2)
        }
        var config = {
            method: 'post',
            url: url,
            headers: (page == '1') ? default_header : page_header,
            data: (page == '1') ? data : data3
        };

        await axios(config)
            .then((response) => {
                const $ = cheerio.load(response.data)                
                /* #region 取得網頁參數(讀取下一頁的header要用到)  */
                var viewstate = $('input[id="__VIEWSTATE"]').attr('value')
                var VIEWSTATEGENERATOR = $('input[id="__VIEWSTATEGENERATOR"]').attr('value')
                var EVENTVALIDATION = $('input[id="__EVENTVALIDATION"]').attr('value')
                txt_obj['__EVENTARGUMENT'] = 'Page$' + page
                txt_obj['__VIEWSTATE'] = viewstate
                txt_obj['__VIEWSTATEGENERATOR'] = VIEWSTATEGENERATOR
                txt_obj['__EVENTVALIDATION'] = EVENTVALIDATION
                $('.body input').each(function (i, elem) {
                    var key = $(elem).attr('name')
                    var value = $(elem).attr('value')
                    txt_obj[key] = (value == undefined) ? '' : value
                })
                txt_obj['ScrollTop'] = '634.8800048828125'
                txt_obj['__dnnVariable'] = '{"__scdoff":"1","__dnn_pageload":"__dnn_setScrollTop();"}'

                /* #endregion */

                /* #region  抓取所有診所資訊 */
                const table_tr = $('.prod-table tbody')
                for (let i = 1; i < table_tr.length - 1; i++) { // 走訪 table                                        
                    var table_td = table_tr.eq(i).find('a') // 擷取每個欄位(tr)                                             
                    datares.Clinic_Name.push(table_td.eq(0).text()) //擷取診所名稱
                    datares.Clinic_herf.push(table_td.eq(0).attr('href'))//擷取診所資訊
                    datares.Pos_Google.push(table_td.eq(1).attr('href')) //擷取Google地圖的連結
                    var phone_pos = table_tr.eq(i).find('span').text()//擷取診所位置和電話                    
                    datares.Pos.push(phone_pos.substr(0, phone_pos.indexOf('('))) //診所位置
                    datares.Phone_Num.push(phone_pos.substr(phone_pos.indexOf('('), phone_pos.length - 1))//診所電話   
                }

                //取得頁碼
                for (var i = 1; i < 11; i++) {
                    var test = $('#dnn_ctr1089_ViewVNHI_Clinics_mcsModuleCont_ctl00_visClinicList_gvwClinicList > tbody > tr:nth-child(11) > td > table > tbody > tr > td:nth-child('
                        + i + ') > a')
                    datares.Page_num.push(test.text())
                }            
                
                /* #endregion */

            })
            .catch(function (error) {
                console.log('error : ' + error);
            });


        /* #region 將header暫存到Temp.txt中  */
        fs.writeFile('Hospital/Temp.txt', JSON.stringify(txt_obj), function (err) {
            if (err) return console.log(err);
        });
        /* #endregion */

        return datares
    }
}
