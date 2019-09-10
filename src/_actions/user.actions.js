import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    getUserById,
    addUser,
    updateUser,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/homepage');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
function addUser(user) {
    return dispatch => {
        dispatch(request(user));

        userService.add(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/homepage');
                    dispatch(alertActions.success('User added successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.ADDUSER_REQUEST, user } }
    function success(user) { return { type: userConstants.ADDUSER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.ADDUSER_FAILURE, error } }
}
function updateUser(user) {
    return dispatch => {
        dispatch(request(user));

        userService.update(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/homepage');
                    dispatch(alertActions.success('User updated successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.UPDATEUSER_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDATEUSER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATEUSER_FAILURE, error } }
}

function getAll(pageNumber) {
    return dispatch => {
        dispatch(request(pageNumber));

        userService.getAll(pageNumber)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(pageNumber,error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST,pageNumber } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users,pageNumber } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, pageNumber,error } }
}
function getUserById(userid) {
    return dispatch => {
        dispatch(request(userid));

        userService.getById(userid)
            .then(                
                user => {dispatch(success(user))},
                error => dispatch(failure(userid,error.toString()))
            );
    };

    function request() { return { type: userConstants.GETUSER_REQUEST,userid }}
    function success(user) { return { type: userConstants.GETUSER_SUCCESS, user} }
    function failure(error) { return { type: userConstants.GETUSER_FAILURE, userid,error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                users => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST,id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS,id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}