import Axios from 'axios';
import React from 'react';
import { GetCGMH, GetClinic, GetClinicCurrent, GetNTUH, GetTPREG, GetTVGH } from './Data';
import './page1.scss';
let current_City = 'TPI'
const area = {
  'TPI': <select id='area'><option>全部</option><option value=" ">全部</option><option value="100">中正區</option><option value="103">大同區</option><option value="104">中山區</option><option value="105">松山區</option><option value="106">大安區</option><option value="108">萬華區</option><option value="110">信義區</option><option value="111">士林區</option><option value="112">北投區</option><option value="114">內湖區</option><option value="115">南港區</option><option value="116">文山區</option></select>,
  'KHG': <select id='area'><option value=" ">全部</option><option value="800">新興區</option><option value="801">前金區</option><option value="802">苓雅區</option><option value="803">鹽埕區</option><option value="804">鼓山區</option><option value="805">旗津區</option><option value="806">前鎮區</option><option value="807">三民區</option><option value="811">楠梓區</option><option value="812">小港區</option><option value="813">左營區</option><option value="814">仁武區</option><option value="815">大社區</option><option value="820">岡山區</option><option value="821">路竹區</option><option value="822">阿蓮區</option><option value="823">田寮區</option><option value="824">燕巢區</option><option value="825">橋頭區</option><option value="826">梓官區</option><option value="827">彌陀區</option><option value="828">永安區</option><option value="829">湖內區</option><option value="830">鳳山區</option><option value="831">大寮區</option><option value="832">林園區</option><option value="833">鳥松區</option><option value="840">大樹區</option><option value="842">旗山區</option><option value="843">美濃區</option><option value="844">六龜區</option><option value="845">內門區</option><option value="846">杉林區</option><option value="847">甲仙區</option><option value="848">桃源區</option><option value="849">那瑪夏區</option><option value="851">茂林區</option><option value="852">茄萣區</option></select>,
  'NTP': <select id='area'><option value=" ">全部</option><option value="207">萬里區</option><option value="208">金山區</option><option value="220">板橋區</option><option value="221">汐止區</option><option value="222">深坑區</option><option value="223">石碇區</option><option value="224">瑞芳區</option><option value="226">平溪區</option><option value="227">雙溪區</option><option value="228">貢寮區</option><option value="231">新店區</option><option value="232">坪林區</option><option value="233">烏來區</option><option value="234">永和區</option><option value="235">中和區</option><option value="236">土城區</option><option value="237">三峽區</option><option value="238">樹林區</option><option value="239">鶯歌區</option><option value="241">三重區</option><option value="242">新莊區</option><option value="243">泰山區</option><option value="244">林口區</option><option value="247">蘆洲區</option><option value="248">五股區</option><option value="249">八里區</option><option value="251">淡水區</option><option value="252">三芝區</option><option value="253">石門區</option></select>,
  'TCG': <select id='area'><option value=" ">全部</option><option value="400">中區</option><option value="401">東區</option><option value="402">南區</option><option value="403">西區</option><option value="404">北區</option><option value="406">北屯區</option><option value="407">西屯區</option><option value="408">南屯區</option><option value="411">太平區</option><option value="412">大里區</option><option value="413">霧峰區</option><option value="414">烏日區</option><option value="420">豐原區</option><option value="421">后里區</option><option value="422">石岡區</option><option value="423">東勢區</option><option value="424">和平區</option><option value="426">新社區</option><option value="427">潭子區</option><option value="428">大雅區</option><option value="429">神岡區</option><option value="432">大肚區</option><option value="433">沙鹿區</option><option value="434">龍井區</option><option value="435">梧棲區</option><option value="436">清水區</option><option value="437">大甲區</option><option value="438">外埔區</option><option value="439">大安區</option></select>,
  'TNN': <select id='area'><option value=" ">全部</option><option value="700">中西區</option><option value="701">東區</option><option value="702">南區</option><option value="704">北區</option><option value="708">安平區</option><option value="709">安南區</option><option value="710">永康區</option><option value="711">歸仁區</option><option value="712">新化區</option><option value="713">左鎮區</option><option value="714">玉井區</option><option value="715">楠西區</option><option value="716">南化區</option><option value="717">仁德區</option><option value="718">關廟區</option><option value="719">龍崎區</option><option value="720">官田區</option><option value="721">麻豆區</option><option value="722">佳里區</option><option value="723">西港區</option><option value="724">七股區</option><option value="725">將軍區</option><option value="726">學甲區</option><option value="727">北門區</option><option value="730">新營區</option><option value="731">後壁區</option><option value="732">白河區</option><option value="733">東山區</option><option value="734">六甲區</option><option value="735">下營區</option><option value="736">柳營區</option><option value="737">鹽水區</option><option value="741">善化區</option><option value="742">大內區</option><option value="743">山上區</option><option value="744">新市區</option><option value="745">安定區</option></select>,
  'KLG': <select id='area'><option value=" ">全部</option><option value="200">仁愛區</option><option value="201">信義區</option><option value="202">中正區</option><option value="203">中山區</option><option value="204">安樂區</option><option value="205">暖暖區</option><option value="206">七堵區</option></select>,
  'TYN': <select id='area'><option value=" ">全部</option><option value="320">中壢市</option><option value="324">平鎮市</option><option value="325">龍潭鄉</option><option value="326">楊梅市</option><option value="327">新屋鄉</option><option value="328">觀音鄉</option><option value="330">桃園市</option><option value="333">龜山鄉</option><option value="334">八德市</option><option value="335">大溪鎮</option><option value="336">復興鄉</option><option value="337">大園鄉</option><option value="338">蘆竹鄉</option></select>,
  '300': <select id='area'></select>,
  'HCU': <select id='area'><option value=" ">全部</option><option value="302">竹北市</option><option value="303">湖口鄉</option><option value="304">新豐鄉</option><option value="305">新埔鎮</option><option value="306">關西鎮</option><option value="307">芎林鄉</option><option value="308">寶山鄉</option><option value="310">竹東鎮</option><option value="311">五峰鄉</option><option value="312">橫山鄉</option><option value="313">尖石鄉</option><option value="314">北埔鄉</option><option value="315">峨眉鄉</option></select>,
  'MLI': <select id='area'><option value=" ">全部</option><option value="350">竹南鎮</option><option value="351">頭份鎮</option><option value="352">三灣鄉</option><option value="353">南庄鄉</option><option value="354">獅潭鄉</option><option value="356">後龍鎮</option><option value="357">通霄鎮</option><option value="358">苑裡鎮</option><option value="360">苗栗市</option><option value="361">造橋鄉</option><option value="362">頭屋鄉</option><option value="363">公館鄉</option><option value="364">大湖鄉</option><option value="365">泰安鄉</option><option value="366">銅鑼鄉</option><option value="367">三義鄉</option><option value="368">西湖鄉</option><option value="369">卓蘭鎮</option></select>,
  'CHA': <select id='area'><option value=" ">全部</option><option value="500">彰化市</option><option value="502">芬園鄉</option><option value="503">花壇鄉</option><option value="504">秀水鄉</option><option value="505">鹿港鎮</option><option value="506">福興鄉</option><option value="507">線西鄉</option><option value="508">和美鎮</option><option value="509">伸港鄉</option><option value="510">員林鎮</option><option value="511">社頭鄉</option><option value="512">永靖鄉</option><option value="513">埔心鄉</option><option value="514">溪湖鎮</option><option value="515">大村鄉</option><option value="516">埔鹽鄉</option><option value="520">田中鎮</option><option value="521">北斗鎮</option><option value="522">田尾鄉</option><option value="523">埤頭鄉</option><option value="524">溪州鄉</option><option value="525">竹塘鄉</option><option value="526">二林鎮</option><option value="527">大城鄉</option><option value="528">芳苑鄉</option><option value="530">二水鄉</option></select>,
  'NTU': <select id='area'><option value=" ">全部</option><option value="540">南投市</option><option value="541">中寮鄉</option><option value="542">草屯鎮</option><option value="544">國姓鄉</option><option value="545">埔里鎮</option><option value="546">仁愛鄉</option><option value="551">名間鄉</option><option value="552">集集鎮</option><option value="553">水里鄉</option><option value="555">魚池鄉</option><option value="556">信義鄉</option><option value="557">竹山鎮</option><option value="558">鹿谷鄉</option></select>,
  'YLN': <select id='area'><option value=" ">全部</option><option value="630">斗南鎮</option><option value="631">大埤鄉</option><option value="632">虎尾鎮</option><option value="633">土庫鎮</option><option value="634">褒忠鄉</option><option value="635">東勢鄉</option><option value="636">臺西鄉</option><option value="637">崙背鄉</option><option value="638">麥寮鄉</option><option value="640">斗六市</option><option value="643">林內鄉</option><option value="646">古坑鄉</option><option value="647">莿桐鄉</option><option value="648">西螺鎮</option><option value="649">二崙鄉</option><option value="651">北港鎮</option><option value="652">水林鄉</option><option value="653">口湖鄉</option><option value="654">四湖鄉</option><option value="655">元長鄉</option></select>,
  '600': <select id='area'></select>,
  'CYI': <select id='area'><option value=" ">全部</option><option value="602">番路鄉</option><option value="603">梅山鄉</option><option value="604">竹崎鄉</option><option value="605">阿里山鄉</option><option value="606">中埔鄉</option><option value="607">大埔鄉</option><option value="608">水上鄉</option><option value="611">鹿草鄉</option><option value="612">太保市</option><option value="613">朴子市</option><option value="614">東石鄉</option><option value="615">六腳鄉</option><option value="616">新港鄉</option><option value="621">民雄鄉</option><option value="622">大林鎮</option><option value="623">溪口鄉</option><option value="624">義竹鄉</option><option value="625">布袋鎮</option></select>,
  'PTG': <select id='area'><option value=" ">全部</option><option value="900">屏東市</option><option value="901">三地門鄉</option><option value="902">霧臺鄉</option><option value="903">瑪家鄉</option><option value="904">九如鄉</option><option value="905">里港鄉</option><option value="906">高樹鄉</option><option value="907">盬埔鄉</option><option value="908">長治鄉</option><option value="909">麟洛鄉</option><option value="911">竹田鄉</option><option value="912">內埔鄉</option><option value="913">萬丹鄉</option><option value="920">潮州鎮</option><option value="921">泰武鄉</option><option value="922">來義鄉</option><option value="923">萬巒鄉</option><option value="924">崁頂鄉</option><option value="925">新埤鄉</option><option value="926">南州鄉</option><option value="927">林邊鄉</option><option value="928">東港鎮</option><option value="929">琉球鄉</option><option value="931">佳冬鄉</option><option value="932">新園鄉</option><option value="940">枋寮鄉</option><option value="941">枋山鄉</option><option value="942">春日鄉</option><option value="943">獅子鄉</option><option value="944">車城鄉</option><option value="945">牡丹鄉</option><option value="946">恆春鎮</option><option value="947">滿州鄉</option></select>,
  'ILN': <select id='area'><option value=" ">全部</option><option value="260">宜蘭市</option><option value="261">頭城鎮</option><option value="262">礁溪鄉</option><option value="263">壯圍鄉</option><option value="264">員山鄉</option><option value="265">羅東鎮</option><option value="266">三星鄉</option><option value="267">大同鄉</option><option value="268">五結鄉</option><option value="269">冬山鄉</option><option value="270">蘇澳真</option><option value="272">南澳鄉</option></select>,
  'HLN': <select id='area'><option value=" ">全部</option><option value="970">花蓮市</option><option value="971">新城鄉</option><option value="972">秀林鄉</option><option value="973">吉安鄉</option><option value="974">壽豐鄉</option><option value="975">鳳林鎮</option><option value="976">光復鄉</option><option value="977">豐濱鄉</option><option value="978">瑞穗鄉</option><option value="979">萬榮鄉</option><option value="981">玉里鎮</option><option value="982">卓溪鄉</option><option value="983">富里鄉</option></select>,
  'TTG': <select id='area'><option value=" ">全部</option><option value="950">臺東市</option><option value="951">綠島鄉</option><option value="952">蘭嶼鄉</option><option value="953">延平鄉</option><option value="954">卑南鄉</option><option value="955">鹿野鄉</option><option value="956">關山鎮</option><option value="957">海端鄉</option><option value="958">池上鄉</option><option value="959">東河鄉</option><option value="961">成功鎮</option><option value="962">長濱鄉</option><option value="963">太麻里鄉</option><option value="964">金峰鄉</option><option value="965">大武鄉</option><option value="966">達仁鄉</option></select>,
  'PHU': <select id='area'><option value=" ">全部</option><option value="880">馬公市</option><option value="881">西嶼鄉</option><option value="882">望安鄉</option><option value="883">七美鄉</option><option value="884">白沙鄉</option><option value="885">湖西鄉</option></select>,
  'KMN': <select id='area'><option value=" ">全部</option><option value="890">金沙鎮</option><option value="891">金湖鎮</option><option value="892">金寧鄉</option><option value="893">金城鎮</option><option value="894">烈嶼鄉</option><option value="896">烏坵鄉</option></select>,
  'LCG': <select id='area'><option value=" ">全部</option><option value="209">南竿鄉</option><option value="210">北竿鄉</option><option value="211">莒光鄉</option><option value="212">東引鄉</option></select>
}
class Page1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      HosCode: [{ name: '基隆', code: '2' },
      { name: '情人湖', code: 'E' },
      { name: '台北', code: '1' },
      { name: '長庚', code: 'B' },
      { name: '土城', code: 'V' },
      { name: '林口', code: '3' },
      { name: '桃園', code: '5' },
      { name: '長青', code: 'N' },
      { name: '雲林', code: 'M' },
      { name: '嘉義', code: '6' },
      { name: '高雄', code: '8' },
      { name: '鳳山', code: 'T' }],
      DeotCode: [{ name: '類流感門診', code: '01' }],
      data: [],
      clinic_data: [],
      current_Hos: 'CGMH',
      current_Search: 'Clinic',
      current_City: 'TPI',
    }
  }
  setHos = (e) => {
    let data
    console.log(e.target.value)
    switch (e.target.value) {
      case 'CGMH':
        data = [{ name: '基隆', code: '2' },
        { name: '情人湖', code: 'E' },
        { name: '台北', code: '1' },
        { name: '長庚', code: 'B' },
        { name: '土城', code: 'V' },
        { name: '林口', code: '3' },
        { name: '桃園', code: '5' },
        { name: '長青', code: 'N' },
        { name: '雲林', code: 'M' },
        { name: '嘉義', code: '6' },
        { name: '高雄', code: '8' },
        { name: '鳳山', code: 'T' }]
        break
      case 'TVGH':
        data = [{ name: '內科門診', code: '內科門診' },
        { name: '外科門診', code: '外科門診' },
        { name: '小兒門診', code: '小兒門診' },
        { name: '婦產部門診', code: '婦產部門診' },
        { name: '特別門診', code: '特別門診' },
        { name: '獨立部科門診', code: '獨立部科門診' },
        { name: '中醫門診', code: '中醫門診' },
        { name: '放射線部', code: '放射線部' },]
        break
      case 'NTUH':
        data = [{ name: '癌醫中心醫院', code: 'C0' },
        { name: '總院', code: 'T0' },
        { name: '北護分院', code: 'T2' },
        { name: '金山分院', code: 'T3' },
        { name: '新竹分院', code: 'T4' },
        { name: '竹東分院', code: 'T5' },
        { name: '生醫分院', code: 'T6' },
        { name: '雲林分院', code: 'Y0' },]
        break
      case 'TPREG':
        data = [{ name: "內分泌暨新陳代謝科-12", code: "12" },
        { name: "胃腸肝膽科-13", code: "13" },
        { name: "心臟內科-14", code: "14" },
        { name: "胸腔內科-15", code: "15" },
        { name: "腎臟內科-16", code: "16" },
        { name: "血液暨腫瘤科-18", code: "18" },
        { name: "過敏免疫風濕科-19", code: "19" },
        { name: "一般內科及感染科-26", code: "26" },
        { name: "骨質疏鬆暨瘦身保健門診-29", code: "29" },
        { name: "老年醫學科-1G", code: "1G" },
        { name: "一般外科-50", code: "50" },
        { name: "小兒外科-51", code: "51" },
        { name: "神經外科-53", code: "53" },
        { name: "整形外科-55", code: "55" },
        { name: "大腸直腸外科-56", code: "56" },
        { name: "乳房外科-57", code: "57" },
        { name: "心臟血管外科-67", code: "67" },
        { name: "胸腔外科-68", code: "68" },
        { name: "美容門診-69", code: "69" },
        { name: "外傷科-63", code: "63" },
        { name: "小兒科-30", code: "30" },
        { name: "婦科-40", code: "40" },
        { name: "產科-41", code: "41" },
        { name: "中醫內科-C7", code: "C7" },
        { name: "中醫婦兒科-C6", code: "C6" },
        { name: "中醫針灸科-C2", code: "C2" },
        { name: "中醫骨傷科-C3", code: "C3" },
        { name: "三伏貼/三九貼-C1K", code: "C1K" },
        { name: "神經科-20", code: "20" },
        { name: "精神科-21", code: "21" },
        { name: "皮膚科-24", code: "24" },
        { name: "疼痛門診-28", code: "28" },
        { name: "骨科-52", code: "52" },
        { name: "泌尿科-54", code: "54" },
        { name: "眼科-70", code: "70" },
        { name: "耳鼻喉科-71", code: "71" },
        { name: "牙科-72", code: "72" },
        { name: "口腔顎面外科-92", code: "92" },
        { name: "復健科-73", code: "73" },
        { name: "放射腫瘤科-74", code: "74" },
        { name: "家庭醫學科-75", code: "75" },
        { name: "心理諮詢-PS", code: "PS" },
        { name: "麻醉門診-O812", code: "O812" },
        { name: "旅遊醫學門診-752", code: "752" },
        { name: "婦產中西醫整合門診-O40C", code: "O40C" },
        { name: "復健中醫整合門診-C273", code: "C273" },
        { name: "專科諮詢門診-7A", code: "7A" },
        { name: "戒菸門診-753", code: "753" },
        { name: "失智症門診-202", code: "202" },
        { name: "藥師門診-OPHA", code: "OPHA" },
        { name: "兒童腦瘤整合門診-O30A", code: "O30A" }]
        this.setState({ DeotCode: data })
        break
      default:
        break
    }
    this.setState({
      HosCode: data,
      current_Hos: e.target.value
    })
  }
  setDept = (e) => {
    let data = []
    if (this.state.current_Hos === 'CGMH')
      switch (e.target.value) {
        case '2':
          data = [{ name: '類流感門診', code: '01' },
          { name: '內科', code: '02' },
          { name: '外科', code: '03' },
          { name: '牙科', code: '04' },
          { name: '婦產科', code: '05' },
          { name: '兒童專科', code: '06' },
          { name: '其他專科', code: '07' },
          { name: '中醫', code: '08' },
          { name: '聯合門診', code: '09' },
          { name: '自費門診', code: '13' }]
          break
        case 'E':
          data = [{ name: '類流感門診', code: '01' },
          { name: '內科', code: '02' },
          { name: '外科', code: '03' },
          { name: '牙科', code: '04' },
          { name: '婦產科', code: '05' },
          { name: '兒童專科', code: '06' },
          { name: '其他專科', code: '07' },
          { name: '中醫', code: '08' },
          { name: '聯合門診', code: '09' },
          { name: '自費門診', code: '13' }]
          break
        case '1':
          data = [{ name: '類流感門診', code: '01' },
          { name: '內科', code: '02' },
          { name: '外科', code: '03' },
          { name: '牙科', code: '04' },
          { name: '婦產科', code: '05' },
          { name: '兒童專科', code: '06' },
          { name: '其他專科', code: '07' },
          { name: '中醫', code: '08' },
          { name: '聯合門診', code: '09' },
          { name: '自費門診', code: '13' },
          { name: '老人健康檢查', code: '15' },
          { name: '預防保健', code: '16' },]
          break
        case 'B':
          data = [
            { name: '自費門診', code: '13' }]
          break
        case 'V':
          data = [{ name: '類流感門診', code: '01' },
          { name: '內科', code: '02' },
          { name: '外科', code: '03' },
          { name: '牙科', code: '04' },
          { name: '婦產科', code: '05' },
          { name: '兒童專科', code: '06' },
          { name: '其他專科', code: '07' },
          { name: '中醫', code: '08' },
          { name: '聯合門診', code: '09' }]
          break
        case '3':
          data = [{ name: '自費檢驗COVID-19(武漢肺炎)服務', code: '00' },
          { name: '類流感門診', code: '01' },
          { name: '內科', code: '02' },
          { name: '外科', code: '03' },
          { name: '牙科', code: '04' },
          { name: '婦產科', code: '05' },
          { name: '兒童專科', code: '06' },
          { name: '其他專科', code: '07' },
          { name: '中醫', code: '08' },
          { name: '聯合門診', code: '09' },
          { name: '自費門診', code: '13' },
          { name: '預防保健', code: '16' },]
          break
        case '5':
          data = [
            { name: '類流感門診', code: '01' },
            { name: '內科', code: '02' },
            { name: '外科', code: '03' },
            { name: '牙科', code: '04' },
            { name: '婦產科', code: '05' },
            { name: '兒童專科', code: '06' },
            { name: '其他專科', code: '07' },
            { name: '中醫', code: '08' },
            { name: '聯合門診', code: '09' }]
          break
        case 'N':
          data = [
            { name: '內科', code: '02' },
            { name: '其他專科', code: '07' }]
          break
        case 'M':
          data = [{ name: '類流感門診', code: '01' },
          { name: '內科', code: '02' },
          { name: '外科', code: '03' },
          { name: '牙科', code: '04' },
          { name: '婦產科', code: '05' },
          { name: '兒童專科', code: '06' },
          { name: '其他專科', code: '07' },
          { name: '中醫', code: '08' }]
          break
        case '6':
          data = [{ name: '自費檢驗COVID-19(武漢肺炎)服務', code: '00' },
          { name: '類流感門診', code: '01' },
          { name: '內科', code: '02' },
          { name: '外科', code: '03' },
          { name: '牙科', code: '04' },
          { name: '婦產科', code: '05' },
          { name: '兒童專科', code: '06' },
          { name: '其他專科', code: '07' },
          { name: '中醫', code: '08' },
          { name: '自費門診', code: '13' }]
          break
        case '8':
          data = [{ name: '自費檢驗COVID-19(武漢肺炎)服務', code: '00' },
          { name: '類流感門診', code: '01' },
          { name: '內科', code: '02' },
          { name: '外科', code: '03' },
          { name: '牙科', code: '04' },
          { name: '婦產科', code: '05' },
          { name: '兒童專科', code: '06' },
          { name: '其他專科', code: '07' },
          { name: '中醫', code: '08' },
          { name: '質子諮詢門診', code: '12' },
          { name: '自費門診', code: '13' },]
          break
        case 'T':
          data = [
            { name: '類流感門診', code: '01' },
            { name: '內科', code: '02' },
            { name: '外科', code: '03' },
            { name: '牙科', code: '04' },
            { name: '婦產科', code: '05' },
            { name: '兒童專科', code: '06' },
            { name: '其他專科', code: '07' },
            { name: '中醫', code: '08' }]
          break
        default:
          break
      }
    if (this.state.current_Hos === 'NTUH') {
      switch (e.target.value) {
        case 'C0':
          data = [{ name: '綜合內科部', code: 'MEDR' },
          { name: '腫瘤內科部', code: 'ONCR' },
          { name: '血液腫瘤部', code: 'HEMA' },
          { name: '綜合外科部', code: 'SUR' },
          { name: '腫瘤外科部', code: 'SUON' },
          { name: '乳房醫學中心', code: 'KBRC' },
          { name: '麻醉部', code: 'ANE' }]
          break;
        case 'T0':
          data = [,
            { name: "內科部", code: "MED" },
            { name: "老年醫學部", code: "GERO" },
            { name: "家庭醫學部", code: "FM" },
            { name: "神經部", code: "NEUR" },
            { name: "基因醫學部", code: "GENE" },
            { name: "復健部", code: "PMR" },
            { name: "腫瘤醫學部", code: "ONC" },
            { name: "精神部", code: "PSYC" },
            { name: "環境暨職業醫學部", code: "EOM" },
            { name: "外科部", code: "SURG" },
            { name: "骨科部", code: "ORTH" },
            { name: "婦產部", code: "OBGY" },
            { name: "眼科部", code: "OPH" },
            { name: "耳鼻喉部", code: "ENT" },
            { name: "牙科部", code: "DENT" },
            { name: "皮膚部", code: "DERM" },
            { name: "泌尿部", code: "URO" },
            { name: "麻醉部", code: "PC" },
            { name: "影像醫學部", code: "RAD" },
            { name: "營養室", code: "NUTR" },
            { name: "血友病中心", code: "HEMP" },
            { name: "形體美容中心", code: "CHA" },
            { name: "乳房醫學中心", code: "KBRC" },
            { name: "臨床心理中心", code: "CPC" },
            { name: "睡眠中心", code: "SLP" },
            { name: "傷口造口照護小組", code: "EER" },
            { name: "預立醫療照護諮商", code: "ACP" },
            { name: "成人慢性病整合門診", code: "RMC" },
            { name: "兒醫", code: "CHDH" }]
          break;
        case 'T2':
          data = [
            { name: "內科部", code: "MED" },
            { name: "小兒部", code: "PED" },
            { name: "牙科部", code: "DENT" },
            { name: "外科部", code: "SURG" },
            { name: "皮膚部", code: "DERM" },
            { name: "耳鼻喉部", code: "ENT" },
            { name: "泌尿部", code: "URO" },
            { name: "家庭醫學部", code: "FM" },
            { name: "神經部", code: "NEUR" },
            { name: "骨科部", code: "ORTH" },
            { name: "眼科部", code: "OPH" },
            { name: "復健部", code: "PMR" },
            { name: "婦產部", code: "OBGY" },
            { name: "麻醉部", code: "PC" },
            { name: "精神部", code: "PSYC" }]
          break;
        case 'T3':
          data = [
            { name: "家庭醫學科", code: "FM" },
            { name: "外科", code: "SURG" },
            { name: "老年醫學科", code: "GERO" },
            { name: "婦產科", code: "OBGY" },
            { name: "小兒科", code: "PED" },
            { name: "神經部", code: "NEUR" },
            { name: "骨科", code: "ORTH" },
            { name: "皮膚部", code: "DERM" },
            { name: "內科", code: "MED" },
            { name: "眼科", code: "OPH" },
            { name: "耳鼻喉科", code: "ENT" },
            { name: "泌尿科", code: "URO" },
            { name: "復健科", code: "PMR" },
            { name: "牙科", code: "DENT" },
            { name: "精神科", code: "PSYC" },
            { name: "營養室", code: "NUTR" },
            { name: "美容醫學", code: "CHA" },
            { name: "臨床心理室", code: "CPC" }]
          break;
        case 'T4':
          data = [
            { name: "內科部", code: "MED" },
            { name: "家庭醫學部", code: "FM" },
            { name: "神經部", code: "NEUR" },
            { name: "復健部", code: "PMR" },
            { name: "精神部", code: "PSYC" },
            { name: "外科部", code: "SURG" },
            { name: "骨科部", code: "ORTH" },
            { name: "婦產部", code: "OBGY" },
            { name: "眼科部", code: "OPH" },
            { name: "耳鼻喉部", code: "ENT" },
            { name: "牙科部", code: "DENT" },
            { name: "皮膚部", code: "DERM" },
            { name: "泌尿部", code: "URO" },
            { name: "麻醉部", code: "PC" },
            { name: "影像醫學部", code: "RAD" },
            { name: "營養室", code: "NUTR" },
            { name: "形體美容中心", code: "CHA" },
            { name: "腫瘤醫學部", code: "ONC" },
            { name: "小兒部", code: "PED" },
            { name: "乳房醫學中心", code: "KBRC" },
            { name: "環境暨職業醫學部", code: "EOM" }]
        case 'T5':
          data = [
            { name: "內科", code: "MED" },
            { name: "老年醫學科", code: "GERO" },
            { name: "家庭醫學科", code: "FM" },
            { name: "復健科", code: "PMR" },
            { name: "精神科", code: "PSYC" },
            { name: "外科", code: "SURG" },
            { name: "骨科", code: "ORTH" },
            { name: "婦產科", code: "OBGY" },
            { name: "小兒科", code: "PED" },
            { name: "眼科", code: "OPH" },
            { name: "耳鼻喉科", code: "ENT" },
            { name: "牙科", code: "DENT" },
            { name: "皮膚科", code: "DERM" },
            { name: "泌尿科", code: "URO" },
            { name: "麻醉科", code: "PC" },
            { name: "營養科", code: "NUTR" },
            { name: "東美麗中心", code: "DMLC" }]
          break;
        case 'T6':
          data = [
            { name: "內科部", code: "MED" },
            { name: "外科部", code: "SURG" },
            { name: "綜合內科部", code: "MMED" },
            { name: "綜合外科部", code: "SSUR" },
            { name: "婦產部", code: "OBGR" },
            { name: "眼科部", code: "OPH" },
            { name: "小兒部", code: "PEDR" },
            { name: "腫瘤醫學部", code: "ONCR" },
            { name: "影像及核子醫學部", code: "RAD" },
            { name: "麻醉部", code: "PC" }]
          break;
        case 'Y0':
          data = [
            { name: "內科部", code: "MED" },
            { name: "外科部", code: "SURG" },
            { name: "社區及家庭醫學部", code: "FM" },
            { name: "神經部", code: "NEUR" },
            { name: "骨科部", code: "ORTH" },
            { name: "泌尿部", code: "URO" },
            { name: "婦產部", code: "OBGY" },
            { name: "小兒部", code: "PED" },
            { name: "眼科部", code: "OPH" },
            { name: "耳鼻喉部", code: "ENT" },
            { name: "皮膚部", code: "DERM" },
            { name: "復健部", code: "PMR" },
            { name: "精神部", code: "PSYC" },
            { name: "牙科部", code: "DENT" },
            { name: "麻醉部", code: "PC" },
            { name: "腫瘤醫學部", code: "ONC" },
            { name: "血液及腹膜透析", code: "DIA" },
            { name: "營養室", code: "NUTR" },
            { name: "環境暨職業醫學部", code: "EOM" },
            { name: "內科部(虎尾)", code: "HMED" },
            { name: "外科部(虎尾)", code: "HSUR" },
            { name: "社區及家庭醫學部(虎尾)", code: "HFM" },
            { name: "神經部(虎尾)", code: "HNEU" },
            { name: "骨科部(虎尾)", code: "HORT" },
            { name: "泌尿部(虎尾)", code: "HURO" },
            { name: "婦產部(虎尾)", code: "HOBG" },
            { name: "小兒部(虎尾)", code: "HPED" },
            { name: "眼科部(虎尾)", code: "HOPH" },
            { name: "耳鼻喉部(虎尾)", code: "HENT" },
            { name: "皮膚部(虎尾)", code: "HDER" },
            { name: "復健部(虎尾)", code: "HPMR" },
            { name: "精神部(虎尾)", code: "HPSY" },
            { name: "牙科部(虎尾)", code: "HDEN" },
            { name: "麻醉部(虎尾)", code: "HPC" },
            { name: "腫瘤醫學部(虎尾)", code: "HONC" },
            { name: "血液及腹膜透析(虎尾)", code: "HDIA" },
            { name: "營養室(虎尾)", code: "HNUT" },
            { name: "環境暨職業醫學部(虎尾)", code: "HEOM" },
            { name: "醫學美容中心(虎尾)", code: "HMAC" }]
          break;
        default:
          break;
      }
    }
    if (this.state.current_Hos === 'TVGH') {
      switch (e.target.value) {
        case '內科門診':
          data=[{ name: '一般內科', code: 'GM' },
          { name: '心臟內科', code: 'CV' },
          { name: '血液腫瘤', code: 'HEMA' },
          { name: '免疫風濕', code: 'IMRH' },
          { name: '胃腸肝膽', code: 'GI' },
          { name: '神經內科', code: 'NEUR' },
          { name: '胸腔內科', code: 'CM' },
          { name: '腎臟病科', code: 'NEPH' },
          { name: '感染科', code: 'INF' },
          { name: '新陳代謝', code: 'META' }]
          break;
        case '外科門診':
          data=[{ name: '一般外科', code: 'GS' },
          { name: '大腸直腸', code: 'CRS' },
          { name: '心臟外科', code: 'CVS' },
          { name: '兒童外科', code: 'PEDS' },
          { name: '泌尿外科', code: 'GU' },
          { name: '神經外科', code: 'NS' },
          { name: '骨科部', code: 'ORTH' },
          { name: '整形外科', code: 'PS' }]
          break
        case '小兒門診':
          data=[{ name: '代謝遺傳', code: 'PMET' },
        { name: '兒童心智', code: 'PSYC' },
        { name: '健兒門診', code: 'WBC' }]
          break;
        case '婦產部門診':
          data = [{ name: '婦女醫學部', code: 'OBGY' }]
          break
        case '特別門診':
          data = [{ name: '體重管理整合門診', code: 'WECO' }]
          break;//up not yet
        case '獨立部科門診':
          data = [{ name: '一般牙科', code: 'DENT' },
          { name: '口腔顎面', code: 'OS' },
          { name: '兒童牙科', code: 'PEDO' },
          { name: '門診化療室', code: 'CHEM' },
          { name: '下午家醫', code: 'FMP' },
          { name: '精神部', code: 'PSY' },
          { name: '皮膚科', code: 'DERM' },
          { name: '耳鼻喉頭頸部', code: 'ENT' },
          { name: '門診藥局', code: 'PHAR' },
          { name: '眼科部', code: 'OPH' },
          { name: '腫瘤科', code: 'CT' },
          { name: '復健科', code: 'REHA' },]
          break
        case '中醫門診':
          data = [{ name: '傳統醫學科', code: 'TCM' }]
          break
        case '放射線部':
          data = [{ name: '電腦斷層檢查報到櫃臺', code: 'CTSC' }]
          break
        default:
          break;
      }
    }
    console.log(data)
    this.setState({ DeotCode: data })
  }
  getData = async (e) => {
    if (e.target.id == 'Hos_send') {
      let HosCode
      let Hos
      let DeptCode,DeptName
      let Time
      let serverdata
      switch (this.state.current_Hos) {
        case 'CGMH':
          HosCode = document.getElementById('HosCode').value
          Hos = document.getElementById('Hos').value
          DeptCode = document.getElementById('DeptCode').value
          Time = document.getElementById('Time').value
          serverdata = await GetCGMH(Hos, HosCode, DeptCode, Time)
          break;
        case 'NTUH':
          HosCode = document.getElementById('HosCode').value
          Hos = document.getElementById('Hos').value
          DeptCode = document.getElementById('DeptCode').value
          Time = document.getElementById('Time').value
          serverdata = await GetNTUH(Hos, HosCode, DeptCode, Time)
          break
        case 'TVGH':
          HosCode = document.getElementById('HosCode').value
          Hos = document.getElementById('Hos').value
          DeptCode = document.getElementById('DeptCode').value
          serverdata = await GetTVGH(Hos, DeptCode,'s')
          break
        case 'TPREG':
          Hos = document.getElementById('Hos').value
          DeptCode = document.getElementById('DeptCode').value
          DeptName = document.getElementById('DeptCode').name
          Time = document.getElementById('Time').value
          serverdata = await GetTPREG(Hos, Time, DeptCode, DeptName)
          break
        default:
          break;
      }
      let data = []
      if (this.state.current_Hos !== 'TPREG')
        for (var i = 0; i < serverdata.id.length; i++) {
          if(this.state.current_Hos==='TVGH'){
            data.push({ id: serverdata.id[i], subject: DeptName, doctor: serverdata.doctor[i], current: serverdata.current[i] })
          }
          else{
          data.push({ id: serverdata.id[i], subject: serverdata.subject[i], doctor: serverdata.doctor[i], current: serverdata.current[i] })
          }
        }
      else
        for (var i = 0; i < serverdata.pos.length; i++) {
          data.push({ id: serverdata.pos[i], subject: serverdata.Diagnosis[i], doctor: serverdata.doctor[i], current: serverdata.current[i] })
        }
      if(data.length==0)
      alert('暫無資料')
      console.log(data)
      this.setState({ data: data })
    }
    else {
      let City = document.getElementById('city').value
      let Area = document.getElementById('area').value
      let Type = document.getElementById('type').value
      let Subject = document.getElementById('subject').value
      let serverdata = await GetClinic(City, Area, Type, Subject, 1)
      let data = []
      console.log(serverdata)
      for (var j = 0; j < serverdata.Page_num.length; j++) {
        if (serverdata.Page_num[j] !== "") {
          serverdata = await GetClinic(City, Area, Type, Subject, serverdata.Page_num[j])
        }
        for (var i = 0; i < serverdata.Clinic_Name.length; i++) {
          data.push({ name: serverdata.Clinic_Name[i], href: serverdata.Clinic_herf[i], phone: serverdata.Phone_Num[i], position: serverdata.Pos[i] })
          this.setState({ clinic_data: data })
        }
      }
    }
  }
  switch = (e) => {
    if (e.target.value == '0')
      this.setState({ current_Search: 'Hos' })
    else if (e.target.value == '1')
      this.setState({ current_Search: 'Clinic' })
  }
  setCity = (e) => {
    current_City = e.target.value
    this.setState({ current_City: e.target.value })
  }
  render() {
    return (
      <div className="container">
        <div className='form'>
          <ul className='switch'>
            <li value='1' className={this.state.current_Search === "Clinic" ? 'choose' : "x"} onClick={this.switch}>診所</li>
            <li value='0' className={this.state.current_Search === "Hos" ? 'choose' : "x"} onClick={this.switch}>醫院</li>
          </ul>
          <div className="inputgroup">
            {this.state.current_Search === 'Hos' ?
              <div>
                <select id='Hos' onChange={this.setHos}>
                  {/*<option selected='selected' value='CGMH'>長庚醫院</option>*/}
                  <option>醫院</option>
                  <option value='NTUH'>台大醫院</option>
                  <option value='TVGH'>台中榮總</option>
                  <option value='TPREG'>馬偕醫院</option>
                </select>
                {this.state.current_Hos === 'NTUH' ?
                  <select id='Time' onChange={this.setTime}>
                    <option selected='selected' value='1'>上午</option>
                    <option value='2'>下午</option>
                  </select> :
                  <select id='Time' onChange={this.setTime}>
                    <option>時段</option>
                    <option value='1'>上午</option>
                    <option value='2'>下午</option>
                    <option value='3'>夜間</option>
                  </select>}
                {this.state.current_Hos === 'TPREG' ? <div></div> :
                  <select id='HosCode' onChange={this.setDept}>
                    <option>{this.state.current_Hos === 'TVGH' ? '門診' : '院區'}</option>
                    {this.state.HosCode.map(item => (<option value={item.code}>{item.name}</option>))}
                  </select>}
                <select id='DeptCode'>
                  <option>科別</option>
                  {this.state.DeotCode.map(item => (<option value={item.code} name={item.name}>{item.name}</option>))}
                </select>
                <button id='Hos_send' onClick={this.getData}>查詢</button></div> :
              <div>
                <select id='city' onChange={this.setCity}>
                  <option>縣市</option>
                  <option value="TPI" selected="selected">臺北市</option>
                  <option value="KHG">高雄市</option>
                  <option value="NTP">新北市</option>
                  <option value="TCG">臺中市</option>
                  <option value="TNN">臺南市</option>
                  <option value="KLG">基隆市</option>
                  <option value="TYN">桃園縣</option>
                  <option value="300">新竹市</option>
                  <option value="HCU">新竹縣</option>
                  <option value="MLI">苗栗縣</option>
                  <option value="CHA">彰化縣</option>
                  <option value="NTU">南投縣</option>
                  <option value="YLN">雲林縣</option>
                  <option value="600">嘉義市</option>
                  <option value="CYI">嘉義縣</option>
                  <option value="PTG">屏東縣</option>
                  <option value="ILN">宜蘭縣</option>
                  <option value="HLN">花蓮縣</option>
                  <option value="TTG">臺東縣</option>
                  <option value="PHU">澎湖縣</option>
                  <option value="KMN">金門縣</option>
                  <option value="LCG">連江縣</option>
                </select>
                {area[current_City]}
                <select id='type'>
                  <option>院所類型</option>
                  <option value=" ">全部</option>
                  <option value="1">醫學中心</option>
                  <option value="2">區域醫院</option>
                  <option value="3">地區醫院</option>
                  <option value="4">診所</option>
                </select>
                <select id='subject'>
                  <option>院所科別</option>
                  <option value=" ">全部</option>
                  <option value="00">不分科</option>
                  <option value="01">家醫科</option>
                  <option value="02">內科</option>
                  <option value="03">外科</option>
                  <option value="04">兒科</option>
                  <option value="05">婦產科</option>
                  <option value="06">骨科</option>
                  <option value="07">神經外科</option>
                  <option value="08">泌尿科</option>
                  <option value="09">耳鼻喉科</option>
                  <option value="10">眼科</option>
                  <option value="11">皮膚科</option>
                  <option value="12">神經科</option>
                  <option value="13">精神科</option>
                  <option value="14">復健科</option>
                  <option value="15">整形外科</option>
                  <option value="40">牙科</option>
                  <option value="60">中醫科</option>
                </select>
                <button id='Clinic_send' onClick={this.getData}>查詢</button></div>}
          </div>
        </div>
        <Table status={this.state.current_Search} clinic_data={this.state.clinic_data} data={this.state.data} />
      </div>
    );
  }
}


class Table extends React.Component {
  render() {
    if (this.props.status === 'Hos')
      return (
        <div className="table">
          <div className="header">
            <li>科別</li>
            <li>醫師</li>
            <li>診間</li>
            <li>當前號數</li>
          </div>
          <div className="data-container">
            {this.props.data.map(item => (<TableItems status={this.props.status} subject={item.subject} id={item.id} doctor={item.doctor} current={item.current} />))}
          </div>
        </div>
      )
    else
      return (
        <div className="table">
          <div className="header">
            <li>醫院</li>
            <li>地址</li>
            <li>電話</li>
            <li>看診進度</li>
          </div>
          <div className="data-container">
            {this.props.clinic_data.map(item => (<TableItems status={this.props.status} name={item.name} phone={item.phone} position={item.position} href={item.href} />))}
          </div>
        </div>
      )
  }
}

class TableItems extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      status: false,
      data: []
    }
  }
  getClincCurrent = async (e) => {
    console.log(e.target.name)
    var res = await GetClinicCurrent(e.target.name)
    var data = []
    if (res.Doctor.length == 0) {
      data.push({ clinic_num: '暫無資料', doctor: '暫無資料', time: '暫無資料', wait_num: '暫無資料', current: '暫無資料' })
    }
    else
      for (var i = 0; i < res.Doctor.length; i++) {
        data.push({ clinic_num: res.Clinic_Num[i], doctor: res.Doctor[i], time: res.Time[i], wait_num: res.WaitNum[i], current: res.Current[i] })
      }
    this.setState({
      data: data,
      status: !this.state.status
    })
    console.log(data)
    console.log(this.state.status, !this.state.status)
  }
  render() {
    return (
      <div>
        <div className='items'>
          <li>{this.props.status === 'Hos' ? this.props.subject : this.props.name}</li>
          <li>{this.props.status === 'Hos' ? this.props.doctor : this.props.position}</li>
          <li>{this.props.status === 'Hos' ? this.props.id : this.props.phone}</li>
          <li>{this.props.status === 'Hos' ? this.props.current : <a onClick={this.getClincCurrent.bind(this)} name={this.props.href}>點擊查看</a>}</li>
        </div>
        <div className={this.state.status == true ? 'clinctable' : 'hidetable'}>
          <li>診間</li>
          <li>醫師</li>
          <li>時段</li>
          <li>當前號數</li>
          <li>等待號數</li>
          {this.state.data.map(item => (
            <div className='clinc_status'>
              <li>{item.clinic_num}</li>
              <li>{item.doctor}</li>
              <li>{item.time}</li>
              <li>{item.current}</li>
              <li>{item.wait_num}</li>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
export default Page1;
