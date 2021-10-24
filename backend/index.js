const express = require('express')
var urlencode = require('urlencode')
var cors = require('cors');
var app = express();
app.use(cors());

app.get('/4/:Hos/:HospCode/:DeptCode/:TimeCode', async function (req, res) {
    var url, rt
    try {        
        const GetHosp = require('./Hospital/' + req.params['Hos'])
        switch (req.params['Hos']) {
            case 'NTUH': //台大                            
                rt = await GetHosp.Hosp(req.params['HospCode'], req.params['DeptCode'], req.params['TimeCode'])
                break
            case 'CGMH': //林口長庚
                url = 'https://register.cgmh.org.tw/Progress/' + req.params['HospCode'] + '?dept=' + req.params['DeptCode'] + '&time=' + req.params['TimeCode']                
                rt = await GetHosp.Hosp(url)
                break
            case 'TPREG':  //馬偕醫院                
                url = 'https://tpreg.mmh.org.tw/OpdProgress.aspx'
                rt = await GetHosp.Hosp(url, req.params['TimeCode'], req.params['DeptCode'])                
                break
            default:
        }
    }
    catch (error) {
        console.log(error)
    }
    res.send(rt)
})

//台中榮總
app.get('/3/:Hos/:SectionID/:SectionName', async function (req, res) {
    var sn = urlencode.encode(req.params['SectionName'])
    var url = 'https://www.vghtc.gov.tw/APIPage/OutpatientProcess2?SECTION_ID=' + req.params['SectionID'] + '&SECTION_NAME=' + sn
    const GetHosp = require('./Hospital/' + req.params['Hos'])
    rt = await GetHosp.Hosp(url, sn)
    //rt = await gettvgh(url, sn)
    res.send(rt)
})

//全國診所
app.get('/5/Clinic/:city/:area/:type/:subj/:kstr/:page', async function (req, res) {
    url = 'https://wroom.vision.com.tw/MainPage/SearchResult.aspx'
    const GetHosp = require('./Hospital/Clinic')
    rt = await GetHosp.Hosp(url, req.params['city'], req.params['area'],
        req.params['type'], req.params['subj'], req.params['kstr'], req.params['page'])
    res.send(rt)
})

app.get('/Clinic_current/MainPage/:url', async function (req, res) {
    url = 'https://wroom.vision.com.tw/'
    const GetHosp = require('./Hospital/Clinic_current')
    var reqstr = req.url
    var par = reqstr.substr(reqstr.indexOf('?') + 1, reqstr.length - 1)
    console.log('url:' + par)    
    rt = await GetHosp.Hosp(url + 'MainPage/ClinicInfo.aspx?' + par)
    res.send(rt)
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("running at http://%s:%s", host, port)
})
