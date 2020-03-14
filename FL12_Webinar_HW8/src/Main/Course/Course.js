import React from 'react';
import './Course.css';
import {NavLink} from 'react-router-dom';

const Course = (props) => {

    let {name, date, description, duration, authors, addValue, onSave} = props;
        
        return(
            <section className="course">
                <h2>New Course</h2>
                <form action="#" onSubmit={onSave}>
                    <label htmlFor="name">Title*
                        <input autoFocus required type="text" id="name" name="name"
                         onChange={(e) => addValue(e)} value={name} />
                    </label><br/>
                    <label htmlFor="description">Description*
                     <textarea required type="text" id="description" name="description"
                      onChange={(e) => addValue(e)} value={description} />
                    </label><br/>
                    <div className="down-block">
                        <div className="down-block__descr">
                            <label htmlFor="duration">Duration*
                                <input required type="text" id="duration" name="duration" 
                                onChange={(e) => addValue(e)} value={duration} />
                            </label>
                            <br/>
                            <label htmlFor="authors">Authors*
                                <input required type="text" id="authors" name="authors" 
                                onChange={(e) => addValue(e)} value={authors} />
                            </label>
                        </div>
                        <div className="down-block__date">
                            <label htmlFor="date">Date*
                                <input required className="date-value" id="date" type="date" name="date"
                                onChange={(e) => addValue(e)} value={date} />
                            </label>
                        </div>
                    </div>
                    <div>
                        <button className="save__btn" type="submit" 
                            disabled={
                                !name,
                                !date,
                                !description,
                                !duration,
                                !authors
                            }
                        >Save</button>
                        <NavLink to="/"><button className="cancel__btn">Cancel</button></NavLink>
                    </div>
                </form>
            </section>
        )
};

export default Course;