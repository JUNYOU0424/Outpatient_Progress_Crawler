import React from 'react';
import './style/nav.scss';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
    constructor(props){
        super(props);
        this.state={
            checked:'1'
        }
    }
    settab = (e) =>{
        this.setState({
            checked:e.target.id
        })
    }
    render() {
        return (
            <nav>
                <div className="logo">
                    
                <h3>健康E把罩</h3>
                </div>
                <ul>
                    <li>
                        <Link className="link" to="/"  onClick={this.settab}>
                            <input id="tab1" type="radio" name="list" checked={this.state.checked==='1'?true:false}></input>
                            <label id='1' htmlFor="tab1">看診進度</label>
                        </Link>
                    </li>
                    <li>
                        <Link className="link" to="/page2"  onClick={this.settab}>
                            <input id="tab2" type="radio" name="list" checked={this.state.checked==='2'?true:false}></input>
                            <label id='2' htmlFor="tab2">健康管理</label>
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Nav;
