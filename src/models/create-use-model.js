import {useSelector} from 'react-redux';
import get from 'lodash/get';

export default (actions) => (path) => {
    const [ modelName, ...paths ] = path.split('.');

    const data = useSelector((state) => {
        const modelState = state[modelName];

        if (!paths?.length) return modelState;

        return get(modelState, paths);
    });

    return [ data, actions[modelName] ];
}
