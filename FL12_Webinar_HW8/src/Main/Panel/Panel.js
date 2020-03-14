import React from 'react';
import './Panel.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {callSearch, callChangeSearchText, callClearSearch} from '../../redux/actions';

class Panel extends React.Component {

    changeInput = async (e) => {
            let value = await e.target.value;
            await this.props.callChangeSearchText(value)
            await this.props.callSearch(this.props.state.searchText)
    }
    
    onClearSearch = () => {
        this.props.callClearSearch()
    }
    render() {
        return(
            <div className="panel">
                <input className="search" type="text" autoFocus placeholder="search" onChange={
                                            (e) => {
                                                this.changeInput(e)  
                                            }}
                                             value={this.props.state.searchText} />
                <NavLink to="/course"><button className="add" onClick={this.onClearSearch}>Add course</button></NavLink>
                
            </div>
        )
    }

};

const mapStateToProps = (state) => {
    return {
        state
    }
};
const mapDispatchToProps = {
    callSearch,
    callChangeSearchText,
    callClearSearch
};
export default connect(mapStateToProps, mapDispatchToProps)(Panel);