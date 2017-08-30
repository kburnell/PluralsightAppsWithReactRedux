export default function courseReducer(state = [], action) {
	switch(action.type) {
		case 'CREATE_COURSE':
			//debugger; //2nd
			return [...state, Object.assign({}, action.course)];
		default:
			return state;
	}
}
