import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class UpdateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id:0,
                firstName: '',
                lastName: '',
                avatar: []
            },
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }
    componentDidMount() {
        var userId = this.props.match.params.userId;
        this.setState({
            user:{
                id:userId
            }
        });

        if (userId != '' && userId != null) {
            this.props.getUser(userId);
        }
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
        //if (user.firstName && user.lastName && user.avatar) {
            console.log(user.firstName, user.lastName,user.avatar);
            this.props.updateUser(user);
        //}
    }
    render() {
        const { user } = this.props;
        console.log('this.props Update: ', user);
        return (
            <div>
                {user.data &&
                    <div className="col-md-6 col-md-offset-3">
                        <h2>Update User</h2>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" className="form-control" name="firstName"
                                    value={user.data.firstName}
                                    defaultValue={user.data.first_name}
                                    onChange={this.handleChange} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" className="form-control" name="lastName" value={user.data.lastName}
                                    onChange={this.handleChange}
                                    defaultValue={user.data.last_name} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="avatar">Choose your Avatar</label>
                                <input type="file"
                                    name="avatar"
                                    onChange={this.handleChange}
                                //value={user.data.avatar}
                                />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>

                }
            </div>
        );
    }

}

function mapState(state) {
    const { user } = state;
    return { user };
}

const actionCreators = {
    getUser: userActions.getUserById,
    updateUser: userActions.updateUser

}
const connectedUpdateUserPage = connect(mapState, actionCreators)(UpdateUser);
export { connectedUpdateUserPage as UpdateUser };