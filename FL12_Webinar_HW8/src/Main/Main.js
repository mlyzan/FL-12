import React from 'react';
import './Main.css';
import Panel from './Panel/Panel';
import Item from './Item/Item';
import CourseContainer from './Course/CourseContainer';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

class Main extends React.Component {
   
    render() {
        let array = this.props.state.searchText ? this.props.state.search : this.props.state.data; 
        return(
            <main className="main">
                <Route path='/' exact render={()=> <Panel/>}/>
                {array.map((e)=>{
                    return(
                        <span key={e.id}>
                            <Route path='/' exact render={()=> <Item
                                changeInput={this.changeInput}
                                            id={e.id}
                                            date={e.date} name={e.name}
                                            description={e.description}
                                            duration={e.duration} />}/>
                        </span>
                    )
                })}
                <Route path='/course' exact render={()=> <CourseContainer/>}/>
                <Route path='/course/:id' render={( {match} )=> {
                     return <CourseContainer id={match.params.id} />
                }
                }/>
            </main>
        )
    }
}

const mapStateToProp = (state) => {
    return {
        state
    }
};

export default connect(mapStateToProp)(Main);