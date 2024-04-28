import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
    SET_AUTH_USER: 'SET_AUTH_USER',
    UNSET_AUTH_USER: 'UNSET_AUTH_USER',

};

const setAuthUserActionCreator = (authUser) => {
    return {
        type: ActionType.SET_AUTH_USER,
        payload: {
            authUser
        },
    };
}

const unsetAuthUserActionCreator = () => {
    return {
        type: ActionType.UNSET_AUTH_USER,
        payload: {
            authUser: null

        }
    }
}

const asyncSetAuthUser = ({id, password}) => {
    return async (dispatch) => {
        dispatch(showLoading());
        try {
            const token = await api.login({id, password});
            api.putAccessToken(token);
            const authUser = await api.getOwnProfile(token);

            dispatch(setAuthUserActionCreator(authUser));
        }
        catch (error){
            alert(error.message);
        }
        dispatch(hideLoading());
    }
}

const asyncUnsetAuthUser = () => {
    return async (dispatch) => {
        dispatch(showLoading());
        try {
            dispatch(unsetAuthUserActionCreator());
            api.putAccessToken('');
        }
        catch (error) {
            alert(error.message);
        }
        dispatch(hideLoading());
    }
}

export {
    ActionType,
    setAuthUserActionCreator,
    unsetAuthUserActionCreator,
    asyncSetAuthUser,
    asyncUnsetAuthUser
};
