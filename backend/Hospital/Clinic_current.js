//診所資訊

var qs = require('qs')
const axios = require('axios')
const cheerio = require('cheerio');

var Post_config = {
    method: 'post',
    url: 'https://wroom.vision.com.tw/WServ/VWWL_Clinics.svc/GetWaitInfo',
    headers: {
        'cookie': 'language=zh-TW; .ASPXANONYMOUS=MeeVia-y1gEkAAAANTY0ZTg0NzQtNWYzNC00YTgzLTliOWEtNjg1YWZlYzlhM2Ez0; .ASPXANONYMOUS=LGYATDe11gEkAAAAYmFlMzljMTktZDZmMy00OWRkLWI0MWItMDkwNjliYTVjYzdh0',
        'origin': 'https://wroom.vision.com.tw',
        'referer': 'https://wroom.vision.com.tw/MainPage/ClinicInfo.aspx?CliID=%2f%2fb3QtYla93sL4mqq0XdFw==',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.41',
        'x-requested-with': 'XMLHttpRequest',
        'Content-Type': 'text/plain'
    },    
};

module.exports = {
    Hosp: async function (url) {
        var datares = {
            //Clinic_Time: new Array(), //門診時間
            Current: new Array(),  //目前看診編號
            Doctor: new Array(), //醫生
            WaitNum: new Array(), //等候人數
            Time: new Array(), //時間(早上下午晚上)
            Clinic_Num: new Array(), //診間名稱
        }
        var default_config = {
            method: 'get',
            url: url,
            headers: {                
                'Cookie': 'language=zh-TW; .ASPXANONYMOUS=MeeVia-y1gEkAAAANTY0ZTg0NzQtNWYzNC00YTgzLTliOWEtNjg1YWZlYzlhM2Ez0',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36 Edg/84.0.522.63'
            }
        };

        /* #region  網站的Form-data */
        var data = { "ReqFmt": "LIST" }
        await axios(default_config)
            .then((response) => {
                const $ = cheerio.load(response.data)
                var Script = $('#Form script:not([src])')[6].children[0].data //Get html inner Script

                var C__PortalID = Script.match(/C__PortalID = (\'.*?\')/)[0] //Get variable 'C__PortalID' in script\

                var PortalID = C__PortalID.substr(C__PortalID.indexOf("'") + 1,
                    C__PortalID.indexOf("'", C__PortalID.indexOf("'")))  // string處理
                //get vcode
                var vcode = $('#dnn_ctr655_ViewVWWL_Clinics_mcsModuleCont_ctl00_visWInfos_gvwCRoom').attr('vcode')
                data['PortalID'] = PortalID
                data['vcode'] = vcode
                console.log('data : ' + JSON.stringify(data))
            })
            .catch(function (error) {
                console.log('error : ' + error);
            });

        Post_config['data'] = data
        /* #endregion */


        /* #region  取得該診所的看診資訊 */
        await axios(Post_config)
            .then((response) => {
                var infos = response.data['Infos']
                for (var i = 0; i < Object.keys(infos).length; i++) {
                    datares.Clinic_Num.push(infos[i]['RVID1'])
                    datares.Current.push(infos[i]['RTime'])
                    datares.Doctor.push(infos[i]['WDoct'])
                    datares.WaitNum.push(infos[i]['WRecs'])
                    datares.Time.push(infos[i]['WSect'])
                }
            })
            .catch((error) => {
                console.error(error)
            })
        /* #endregion */

        return datares
    }
}
