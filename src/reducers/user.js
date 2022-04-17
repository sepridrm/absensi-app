const initialState = {
    userState: {}
}

export default (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                userState: action.value
            }

        case 'RESET_STATE':
            return initialState

        default:
            return state;
    }
}