import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions/userActions';
import { Link } from 'react-router-dom';
import Table from './table'
import Button from './button'

class Users extends Component {

    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        
        const userItems = this.props.users.map((user) => {
           return <tr key={user.id}>
           <td data-label="Name">{user.name}</td>
           <td data-label="Email">{user.email}</td>
           <td data-label="PhoneNumber">{user.phone}</td>
           <td data-label="Company Name">{user.company.name}</td>
           <td data-label="Website">{user.website}</td>
           <td>
                <Button btnClass="greenColor">
                        <Link className="text-white text-decoration-none"  to={`/user-albums/${user.id}`}> View Album </Link>
                </Button>
           </td>
       </tr> 
        })
        return (
            <div className="mt-4">
                <Table>
                    <Table.TableHead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>PhoneNumber</th>
                            <th>Company Name</th>
                            <th>Website</th>
                        </tr>
                    </Table.TableHead>
                    <Table.TableBody>
                        {userItems}
                    </Table.TableBody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users.users
})

export default connect(mapStateToProps, {fetchUsers} )(Users) 