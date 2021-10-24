//臺大醫院

const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs');
var qs = require('qs')

//Form-data
var data_txt = {
    '__EVENTTARGET': 'SelectHospDeptAndAMPM$DropDownDept',
    '__EVENTARGUMENT': ' ',
    '__LASTFOCUS': ' ',
    '__VIEWSTATE': '',
    '__VIEWSTATEGENERATOR': '',
    'SelectHospDeptAndAMPM:DropListHosp': '',
    'SelectHospDeptAndAMPM:DropDownDept': '',
    'SelectHospDeptAndAMPM:DropDownAMPM': '',
    'SelectHospDeptAndAMPM:QueryDateText': ''
}

module.exports = {
    Hosp: async function (HospCode, DeptCode, TimeCode) {
        var refer = HospCode == 'T0' ? '' : '?T=' + HospCode        
        var data = {
            id: new Array(), //診間
            current: new Array(), //目前看診號
            doctor: new Array(),  //醫生
            subject: new Array()  //科別
        }

        /* #region  先訪問一次台大網站取得Form-Data */

        //第一次訪問網站的Header
        var config1 = {
            method: 'get',
            url: 'https://reg.ntuh.gov.tw/WebAdministration/ClinicCurrentLightNoByDeptCode.aspx' + refer,
            headers: {
                'Cookie': 'ASP.NET_SessionId=pmzpom451ddaiyahcgqgjr55',
                'Host': 'reg.ntuh.gov.tw',
                'Referer': 'https://www.ntuh.gov.tw/'
            }
        };

        //訪問網站
        await axios(config1).then((response) => {
            const $ = cheerio.load(response.data)
            data_txt['__VIEWSTATE'] = $('#__VIEWSTATE').attr('value')
            data_txt['__VIEWSTATEGENERATOR'] = $('#__VIEWSTATEGENERATOR').attr('value')
            data_txt['SelectHospDeptAndAMPM:DropListHosp'] = HospCode
            data_txt['SelectHospDeptAndAMPM:DropDownDept'] = DeptCode
            data_txt['SelectHospDeptAndAMPM:DropDownAMPM'] = TimeCode
            data_txt['SelectHospDeptAndAMPM:QueryDateText'] = $('#SelectHospDeptAndAMPM_QueryDateText').attr('value')
        }).catch(function (e) {
            console.log(e);
        });

        /* #endregion */

        /* #region  若不是要爬總院的資料要多爬一次網站 */
        if (HospCode != 'T0') {
            data_txt['SelectHospDeptAndAMPM:DropDownAMPM'] = '--時段--'
            var config2 = {
                method: 'post',
                url: 'https://reg.ntuh.gov.tw/WebAdministration/ClinicCurrentLightNoByDeptCode.aspx',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': ' ASP.NET_SessionId=jjhyemrsr1ey2t45kk5gdrff; ASP.NET_SessionId=dygv2aycndibrneqswbt0a55',
                    'Host': ' reg.ntuh.gov.tw',
                    'Origin': ' https://reg.ntuh.gov.tw',
                    'Referer': 'https://reg.ntuh.gov.tw/WebAdministration/ClinicCurrentLightNoByDeptCode.aspx' + refer,
                    'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36 Edg/86.0.622.38'
                },
                data: qs.stringify(data_txt)                
            };

            await axios(config2).then((response) => {
                const $ = cheerio.load(response.data)
                data_txt['__VIEWSTATE'] = $('#__VIEWSTATE').attr('value')
                data_txt['__VIEWSTATEGENERATOR'] = $('#__VIEWSTATEGENERATOR').attr('value')
                data_txt['SelectHospDeptAndAMPM:DropListHosp'] = HospCode
                data_txt['SelectHospDeptAndAMPM:DropDownDept'] = DeptCode
                data_txt['SelectHospDeptAndAMPM:DropDownAMPM'] = TimeCode
                data_txt['SelectHospDeptAndAMPM:QueryDateText'] = $('#SelectHospDeptAndAMPM_QueryDateText').attr('value')
            }).catch(function (e) {
                console.log(e);
            });

        }
        /* #endregion */

        /* #region  第二次訪問台大網站 取得看診資訊 */

        //第二次訪問網站的Header
        var config3 = {
            method: 'post',
            url: 'https://reg.ntuh.gov.tw/WebAdministration/ClinicCurrentLightNoByDeptCode.aspx',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': ' ASP.NET_SessionId=jjhyemrsr1ey2t45kk5gdrff; ASP.NET_SessionId=dygv2aycndibrneqswbt0a55',
                'Host': ' reg.ntuh.gov.tw',
                'Origin': ' https://reg.ntuh.gov.tw',
                'Referer': 'https://reg.ntuh.gov.tw/WebAdministration/ClinicCurrentLightNoByDeptCode.aspx' + refer,
                'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36 Edg/86.0.622.38'
            },
            data: qs.stringify(data_txt)            
        };

        //第二次訪問台大網站並取得看診資訊
        await axios(config3).then((response) => {
            const $ = cheerio.load(response.data)

            var table_tr = $('#RepeatDoctorList > tbody > tr')
            var count = 0 //計算目前到哪一個table      

            for (var i = 1; i <= table_tr.length; i++) {
                var tr_td = $('#RepeatDoctorList > tbody > tr:nth-child(' + i + ') > td')
                for (var j = 1; j <= tr_td.length; j++) {
                    data['id'].push($('#RepeatDoctorList__ctl' + count + '_LabelClinicNoList').text())
                    data['doctor'].push($('#RepeatDoctorList__ctl' + count + '_LabelDRNameList').text())
                    data['current'].push($('#RepeatDoctorList__ctl' + count + '_LabelLightNoShowList').text())
                    data['subject'].push($('#RepeatDoctorList__ctl' + count + '_LabelClinicNameList').text())
                    count += 1
                }
            }
        }).catch(function (e) {
            console.log(e);
        });
        /* #endregion */

        return data
    }
}