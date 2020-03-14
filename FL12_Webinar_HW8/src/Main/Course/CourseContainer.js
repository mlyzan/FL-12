import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {callSave, callEditUser} from '../../redux/actions';
import Course from './Course';

class CourseContainer extends React.Component {
    
    constructor (props) {
        super(props)
        this.state = {
            data: {
                id: this.props.data.length + 1,
                date: '',
                name: '',
                description: '',
                duration: '',
                authors: ''
            },
            isRedirect: false
        };
    }

    componentDidMount () {
        if(this.props.id) {
            let index = this.props.data.findIndex(e => e.id === parseInt(this.props.id));
            this.setState((state) => {
                return {
                    ...state,
                    data: this.props.data[index]
                }
            })
        }
    }

    onSave = (e) => {
        e.preventDefault();
        let isIdInState = this.props.data.some(e => e.id === this.state.data.id);
        if(isIdInState) {
            this.props.callEditUser(this.state.data)
        }else {
            this.props.callSave(this.state.data) 
        }
        this.setState(state => {
            return {
                isRedirect: true
            }
        })
    }

    addValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState((state) => {
            return {
                data: {
                    ...state.data,
                    [name]: value
                }
            }
        })
    }

    render() {
        let {name, date, description, duration, authors} = this.state.data;
        if(this.state.isRedirect) {
            return (<Redirect to ="/" />)
        }
        return(
            <Course name={name} date={date} description={description} duration={duration} authors={authors}
            addValue={this.addValue} onSave={this.onSave}
            />
        )
    }
};

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
};
const mapDispatchToProps = {
    callSave,
    callEditUser
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer);