import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { history } from '../_helpers';


import { userActions } from '../_actions';

import '../HomePage/HomePage.module.css';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers(1);
    }

    handleDeleteUser(id) {
        return (e) => confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this user.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: (e) => this.props.deleteUser(id)
                },
                {
                    label: 'No',
                    onClick: (e) => { return }
                }
            ]
        });
        //return (e) => this.props.deleteUser(id);
    }
    handleUpdateUser(id) {
        return (e) => {
            history.push('/updateuser/' + id);
        };
    }
    handleAddUser() {
        return (e) => {
            history.push('/adduser');
        };

    }

    getPerPageUsers(pageNo) {
        this.props.getUsers(pageNo);
    }

    render() {
        //console.log('this.props: ', this.props);

        const { user, users } = this.props;
        const pageNumbers = [];
        let renderPageNumbers;
        console.log('this.props Homepage: ', user);
        console.log('this.props Homepage: ', users);
        //console.log('users: ', users);

        if (users.total !== null) {
            for (let i = 1; i <= Math.ceil(users.total / users.per_page); i++) {
                pageNumbers.push(i);
            }

            renderPageNumbers = pageNumbers.map(number => {
                let classes = users.current_page === number ? "active" : '';

                return (
                    <span key={number} className={classes}
                        onClick={() => this.getPerPageUsers(number)}>{number}</span>
                );
            });
        }
        return (
            <div className="app">
                <h1>Hi {user.first_name}!</h1>
                <p>You're logged in with React!!</p>
                <h3>All registered users:</h3>
                <button onClick={this.handleAddUser()}
                    className="btn add-btn btn-primary">Add User</button>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <table className="table">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Avatar</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.items.map((user, index) =>
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>
                                        <img src={user.avatar} alt={user.first_name}
                                            style={{ width: 100, height: 100, borderRadius: 50 }} />
                                    </td>
                                    <td>
                                        {
                                            user.deleting ? <em> - Deleting...</em>
                                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                                    : <div className="actionButtonContainer">
                                                        <button className="btn"
                                                            onClick={this.handleDeleteUser(user.id)}>Delete</button>
                                                        <button className="btn"
                                                            onClick={this.handleUpdateUser(user.id)}>Update</button>
                                                    </div>


                                        }
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table >

                }
                <div className="pagination">
                    {renderPageNumbers}
                </div>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div >
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };