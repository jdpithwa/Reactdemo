import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';



class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                avatar: []
            },
            picture: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        console.log('event.target ', event.target);
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }
    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        console.log(user.avatar);
        if (user.firstName && user.lastName && user.avatar[0]) {
            console.log(user.firstName, user.lastName);
            this.props.addUser(user);
        }
    }
    render() {
        const { registering } = this.props;
        const { firstName, lastName, user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Add User</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={user.firstName}
                            onChange={this.handleChange} />
                        {submitted && !firstName &&
                            <div className="help-block">firstName is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={user.lastName}
                            onChange={this.handleChange} />
                        {submitted && !lastName &&
                            <div className="help-block">lastName is required</div>
                        }
                    </div>
                    <div className='form-group'>
                        <label htmlFor="avatar">Choose your Avatar</label>
                        <input type="file"
                            name="avatar"
                            onChange={this.handleChange}
                            value={user.avatar}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        );
    }

}
function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    addUser: userActions.addUser

}
const connectedAddUserPage = connect(mapState, actionCreators)(AddUser);
export { connectedAddUserPage as AddUser };