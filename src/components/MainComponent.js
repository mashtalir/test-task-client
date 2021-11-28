import React, { Component } from 'react';
import Group from './GroupComponent';
import User from './UserComponent';
import ModalUserAdd from './ModalUserAddComponent';
import ModalGroupAdd from './ModalGroupAddComponent';
import UnsuccessfullDeleteModal from './UnsuccessfullDeleteModalComponent';
import {Row,Col,Button,Table,NavItem,NavLink,Nav,TabContent,TabPane,FormGroup,Label,ModalHeader,ModalBody,Modal,Form,Input,ModalFooter} from 'reactstrap';
import classNames from 'classnames';
import axios from 'axios'
import {GROUPS} from '../shared/dishes'

class Main extends Component{

    constructor(props) {
        super(props);
        this.delete_user = this.delete_user.bind(this);
        this.edit_user = this.edit_user.bind(this);
        this.addUser = this.addUser.bind(this);
        this.getUsersList = this.getUsersList.bind(this);
        this.toggle = this.toggle.bind(this);
        this.addGroup = this.addGroup.bind(this)
        this.editGroup = this.editGroup.bind(this)

        this.getGroupsList = this.getGroupsList.bind(this)
        this.deleteGroup = this.deleteGroup.bind(this)
        this.toggleUnsuccessfulDelete = this.toggleUnsuccessfulDelete.bind(this)

        this.state = {
          activeTab: '1',
          users: [],
          groups : [],
          unsuccessfulDelete: false,
        };
      }

    toggleUnsuccessfulDelete(){
      this.setState({
        unsuccessfulDelete: !this.state.unsuccessfulDelete,
      })
    }

    toggle(tab) {
      this.setState({ activeTab: tab });
    }
    
    addUser(userToAddUsername,userToAddEmail,userToAddIsAdmin){
      let config = {
          headers: {
              'Access-Control-Allow-Origin': '*',
          }
        }
      let data = {
          'username': userToAddUsername,
          'email': userToAddEmail,
          'is_admin': userToAddIsAdmin
      }
      axios.post('http://127.0.0.1:8000/users/add-user/',data,config)
      .then(response => {
          // handle success
          console.log(response['data']);
      })
      .catch(error => {
      // handle error
          console.log(error);
      })
      .then(() => {
        this.getUsersList()
        });
    }


    getUsersList(){
      let config = {
          headers: {
              'Access-Control-Allow-Origin': '*',
          }
        }
      let data = {}
      axios.get('http://127.0.0.1:8000/users/',data,config)
      .then(response => {
          // handle success
          console.log(response['data']);
          this.setState({
            users: response['data']
          })
      })
      .catch(error => {
      // handle error
          console.log(error);
      })
    }
    
    edit_user(id,editedUsername,editedEmail,editedIsAdmin) {
      let config = {
          headers: {
              'Access-Control-Allow-Origin': '*',
          }
        }
      let data = {
        'email': editedEmail,
        'username':editedUsername,
        'is_admin': editedIsAdmin,
      }
      axios.put('http://127.0.0.1:8000/users/edit-user/' + id + '/',data,config)
      .then(response => {
          console.log(response['data']);
      })
      .catch(error => {
      // handle error
          console.log(error);
      })
      .then(() => {
      this.getUsersList()
      });
  }

    delete_user(id) {
      let config = {
          headers: {
              'Access-Control-Allow-Origin': '*',
          }
        }
      let data = {

      }
      axios.delete('http://127.0.0.1:8000/users/delete/' + id + '/',data,config)
      .then(response => {
          // handle success
          console.log(response['data']);
      })
      .catch(error => {
      // handle error
          console.log(error);
      })
      .then(() => {
      this.getUsersList()
      });
  }

  addGroup(groupName,groupDescription,groupUsers){
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
      }
    let data = {
        'name': groupName,
        'description': groupDescription,
        'users_to_add': groupUsers
    }
    axios.post('http://127.0.0.1:8000/groups/add-group/',data,config)
    .then(response => {
        // handle success
        console.log(response['data']);
    })
    .catch(error => {
    // handle error
        console.log(error);
    })
    .then(() => {
      this.getGroupsList()
      this.getUsersList()
      });
  }

    getGroupsList(){
      let config = {
          headers: {
              'Access-Control-Allow-Origin': '*',
          }
        }
      let data = {}
      axios.get('http://127.0.0.1:8000/groups/',data,config)
      .then(response => {
          // handle success
          console.log(response['data']);
          this.setState({
            groups: response['data']
          })
      })
      .catch(error => {
      // handle error
          console.log(error);
      })
    }

    editGroup(id,name,description,group_users) {
      let config = {
          headers: {
              'Access-Control-Allow-Origin': '*',
          }
        }
      let data = {
        'id':id,
        'name': name,
        'description':description,
        'group_users': group_users,
      }
      axios.put('http://127.0.0.1:8000/groups/edit-group/' + id + '/',data,config)
      .then(response => {
          console.log(response['data']);
      })
      .catch(error => {
      // handle error
          console.log(error);
      })
      .then(() => {
      this.getUsersList()
      this.getGroupsList()
      });
  }

    deleteGroup(id) {
      let config = {
          headers: {
              'Access-Control-Allow-Origin': '*',
          }
        }
      let data = {

      }
      axios.delete('http://127.0.0.1:8000/groups/delete/' + id + '/',data,config)
      .then(response => {
          // handle success
          if (response['data']['response'] == 'Group is not empty'){
            this.setState({
              unsuccessfulDelete: !this.state.unsuccessfulDelete
            })
            console.log(this.state.unsuccessfulDelete)
          }
      })
      .catch(error => {
      // handle error
          console.log(error);
      })
      .then(() => {
      this.getGroupsList()
      this.getUsersList()
      });
  }
    addUserModalToggle(){
      this.setState({
        addUserModal: !this.state.addUserModal,
          userToAddEmail: '',
          userToAddUsername: '',
          userToAddIsAdmin: false
      })
    }

    componentDidMount() {
      this.getUsersList()
      this.getGroupsList()
      }

    render() {
        return (
          <div className='container'>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classNames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}>
                  Users
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classNames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}>
                  Groups
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
              <Table hover responsive size="sm">
                    <thead>
                        <tr>
                            <th width={"30"} >id</th>
                            <th width={"500"}>Email</th>
                            <th>Group</th>
                            <th>Admin</th>
                            <th width={"150"}>Actions</th>
                        </tr>
                    </thead>
                    <User
                      users={this.state.users}
                      getUsersList={this.getUsersList}
                      delete_user={this.delete_user}
                      edit_user={this.edit_user}
                      />
               </Table>
               <ModalUserAdd addUser={this.addUser}/>
              </TabPane>
              <TabPane tabId="2">
              <Table hover responsive size="sm">
            <thead>
               <tr>
                  <th width={"10"}>  id</th>
                  <th>Name</th>
                  <th>Data Analytics</th>
                  <th>Services Analytics</th>
                  <th>Voice</th>
                  <th>Video</th>
                  <th width={"150"}>Actions</th>

               </tr>
            </thead>
            <Group
            groups = {this.state.groups}
            deleteGroup = {this.deleteGroup}
            getGroupsList = {this.getGroupsList}
            editGroup = {this.editGroup}
            users= {this.state.users}
            />
         </Table>
          <UnsuccessfullDeleteModal unsuccessfulDelete={this.state.unsuccessfulDelete} toggleUnsuccessfulDelete={this.toggleUnsuccessfulDelete}/>
         <ModalGroupAdd users={this.state.users}
                        addGroup = {this.addGroup}/>
              </TabPane>
            </TabContent>
          </div>
        );
      }
}


export default Main;