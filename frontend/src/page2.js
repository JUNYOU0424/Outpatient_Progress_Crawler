import React from 'react';
import './page2.scss';
import { Chart } from 'react-charts'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


class Page2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      chart_option: []
    }
  }
  componentDidMount() {
    var olddata = JSON.parse(localStorage.getItem('data'));
    var s_v_data = []
    var p_vl_data = []
    var p_vh_data = []
    var p_vbmp_data = []
    var date_data = []
    if(olddata!==null)
    for (var i = 0; i < olddata.length; i++) {
      s_v_data.push(parseInt(olddata[i].s_v))
      p_vl_data.push(parseInt(olddata[i].p_vl))
      p_vh_data.push(parseInt(olddata[i].p_vh))
      p_vbmp_data.push(parseInt(olddata[i].p_vbmp))
      date_data.push(olddata[i].date + olddata[i].time)
    }
    console.log(s_v_data, p_vbmp_data, p_vh_data, p_vl_data, date_data)
    this.setState({
      chart_option: {
        title: {
          text: '測量圖表',
        },
        xAxis: {
          type: 'datetime',
          categories: date_data,
        },
        series: [{
          data: s_v_data,
          name: '血糖'
        }, {
          data: p_vh_data,
          name: '血壓(收縮壓)'
        }, {
          data: p_vl_data,
          name: '血壓(擴張壓)'
        }, {
          data: p_vbmp_data,
          name: '心率'
        }],
      }
    })
  }
  record = () => {
    var Dt = new Date()
    var data = []
    var s_v = document.getElementById("sugar_value").value;
    var p_vh = document.getElementById("presure_vh").value;
    var p_vl = document.getElementById("presure_vl").value;
    var p_vbmp = document.getElementById("presure_vbmp").value;
    data.push([{ s_v: s_v, p_vh: p_vh, p_vl: p_vl, p_vbmp: p_vbmp, date: Dt.getMonth() + 1 + '/' + Dt.getDate(), time: Dt.getHours() + ':' + Dt.getMinutes() }])
    console.log(data[0][0])
    var olddata = JSON.parse(localStorage.getItem('data'));
    if (olddata === null) {
      localStorage.setItem('data', JSON.stringify(data[0]))
    }
    else {
      olddata.push(data[0][0])
      localStorage.setItem('data', JSON.stringify(olddata))
    }
    console.log(olddata)
    var s_v_data = []
    var p_vl_data = []
    var p_vh_data = []
    var p_vbmp_data = []
    var date_data = []
    if(olddata!==null)
    for (var i = 0; i < olddata.length; i++) {
      s_v_data.push(parseInt(olddata[i].s_v))
      p_vl_data.push(parseInt(olddata[i].p_vl))
      p_vh_data.push(parseInt(olddata[i].p_vh))
      p_vbmp_data.push(parseInt(olddata[i].p_vbmp))
      date_data.push(olddata[i].date + olddata[i].time)
    }
    console.log(s_v_data, p_vbmp_data, p_vh_data, p_vl_data, date_data)
    this.setState({
      chart_option: {
        title: {
          text: '測量圖表',
        },
        xAxis: {
          type: 'datetime',
          categories: date_data,
        },
        series: [{
          data: s_v_data,
          name: '血糖',
        }, {
          data: p_vh_data,
          name: '血壓(收縮壓)'
        }, {
          data: p_vl_data,
          name: '血壓(擴張壓)'
        }, {
          data: p_vbmp_data,
          name: '心率'
        }],
      }
    })
  }
  render() {
    return (
      <div className="container_p2">
        <div className='inputgp'>
          <div className="sugar">
            <h2>血糖</h2>
            <div className="input">
              <input id="sugar_value" placeholder="mg/dL(血糖值)"></input>
            </div>
          </div>
          <div className="presure">
            <h2>血壓</h2>
            <div className="input">
              <input id="presure_vh" placeholder="mmHg(最高)"></input>
              <input id="presure_vl" placeholder="mmHg(最低)"></input>
              <input id="presure_vbmp" placeholder="bpm(心率)"></input>
            </div>
            <button onClick={this.record}>送出</button>
          </div>
        </div>
        <div className='chart'>
          <HighchartsReact
      containerProps={{ style: { height: "100%" } }}
            highcharts={Highcharts}
            options={this.state.chart_option}
          />
        </div>
      </div>
    );
  }
}

export default Page2;
