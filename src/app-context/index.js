import { createContext, useCallback, useReducer } from 'react';
import { IS_SUB } from 'src/config';

const initialState = { frame: !IS_SUB };

function reducer(state, action) {
    const { type, payload } = action;
    switch (type) {
        case 'frame':
            return { frame: payload };
        default:
            throw new Error(`no such reducer type : ${type}`);
    }
}

export const AppContext = createContext(null);

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const setFrame = useCallback((frame) => dispatch({ type: 'frame', payload: frame }), []);
    return (
        <AppContext.Provider value={{ state, dispatch, setFrame }}>
            {props.children}
        </AppContext.Provider>
    );
};
