import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			course: {title: ""}
		};

		//these allow us to have the correct 'this' in our handlers
		this.onTitleChange = this.onTitleChange.bind(this);
		this.onClickSave = this.onClickSave.bind(this);
	}

	onTitleChange(event) {
		const course = this.state.course;
		course.title = event.target.value;
		this.setState({course: course});
	}

	onClickSave() {
		this.props.actions.createCourse(this.state.course);
	}

	courseRow(course, index) {
		return <div key={index}>{course.title}</div>;
	}

	render() {
		//debugger;  //4th
		return (
			<div>
				<h1>Courses</h1>
				{this.props.courses.map(this.courseRow)}
				<h2>Add Course</h2>
				<input type="text" onChange={this.onTitleChange} value={this.state.course.title} />
				<input type="submit" value="Save" onClick={this.onClickSave} />
			</div>
		);
	}
}

CoursesPage.propTypes = {
	courses: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

// state: current state
// ownProps: allows us to access properties being attached to this component, useful for accessing props from react-router
// return: what props you want exposed on your component
function mapStateToProps(state, ownProps) {
	//debugger; //3rd
	return {
		courses: state.courses //<-- that 'courses' is determined by the property we exposed on the root reducer
	};
}

// return: what actions you want exposed on your component
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(courseActions, dispatch)
	};
}

// the return from connect is a function that is called with CoursesPage as a parameter
// connect has an optional second parameter, mapDispatchToProps.
// when mapDispatchToProps is not supplied a 'dispatch' property attached to it injected by connect
// which can be accessed via 'this.props.dispatch'  dispatch allows you to fire off your actions
//
//export default connect(mapStateToProps)(CoursesPage);
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
