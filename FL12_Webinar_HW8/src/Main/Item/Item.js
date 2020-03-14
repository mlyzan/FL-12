import React from 'react';
import './Item.css';
import editImg from '../../edit.svg';
import deleteImg from '../../delete.svg';
import {connect} from 'react-redux';
import {callDelete, callClearSearch} from '../../redux/actions';
import {NavLink} from 'react-router-dom';

class Item extends React.Component {
    
    state = {
        isMenu: false
    };

    showMenu  = () => {
        this.setState((state) => {
            return {isMenu: !state.isMenu}
          });
    }

    hideMenu = () => {
        if(this.state.isMenu) {
            this.setState((state) => {
                return {isMenu: false}
              });
        }
    }
    
    deleteItem = () => {
        this.props.callDelete(this.props.id)
        this.onClearSearch()
    }

    onClearSearch = () => {
        this.props.callClearSearch()
    }

    render() {
        let {date, name, description, duration} = this.props;
        let clazz = this.state.isMenu ? 'fadeIn': '';
        let dateParse = date.split('-').reverse().join('.');
        return(
            <article className="item" onMouseLeave={this.hideMenu}>
                <div className="item__date">{dateParse}</div>
                <div className="item__title">{name}</div>
                <div className="item__description">{description}</div>
                <div className="item__duration">{duration}</div>
                <div className="item__btn" onClick={this.showMenu}>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className={`menu ${clazz}`}>
                    <NavLink to={`/course/${this.props.id}`}>
                        <button onClick={this.onClearSearch} className="menu__edit"><img className="menu__img" src={editImg} alt="edit"/> Edit</button>
                    </NavLink>
                        <button className="menu__delete" onClick={this.deleteItem}>
                            <img className="menu__img" src={deleteImg} alt="delete"/>
                             Delete
                        </button>
                    </div>
                </div>
            </article>
        )
    }
    
};
const mapDispatchToProps = {
    callDelete,
    callClearSearch
};
export default connect(null, mapDispatchToProps)(Item);