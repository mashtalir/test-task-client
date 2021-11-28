import React, { Component } from 'react';
import {Row,Col,Button,Modal,ModalBody,ModalHeader,ModalFooter,Input,Label,FormGroup,Form,FormText} from 'reactstrap';
import classNames from 'classnames';
import axios from 'axios';

class User extends Component {
   
   constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this)
      this.toggle_close = this.toggle_close.bind(this)
      this.state = {
         modal: false,
         userToEditId: NaN,
         userToEditEmail: NaN,
         userToEditUsername: NaN,
         userToEditIsAdmin: NaN
       };
    }

  toggle(userToEdit){
     this.setState({
        modal: !this.state.modal,
        userToEditId: userToEdit.id,
        userToEditEmail: userToEdit.email,
        userToEditUsername: userToEdit.username,
        userToEditIsAdmin: userToEdit.is_admin
     })
  }
  toggle_close(){
    this.setState({
      modal: !this.state.modal
    })
  }

   render() {
      const user = this.props.users.map((u) => {
        let is_admin;
        if (u.is_admin){
          is_admin = 'Yes'
        }
        else
          is_admin = 'No'

         return (
            <tr>
               <th scope="row">{u.id}</th>
               <td>{u.email}</td>
               <td>{u.groups+' '}</td>
               <td>{is_admin}</td>
               <td>
                  <Button onClick={() => this.toggle(u)}>Edit</Button>
                  <Button onClick={() => this.props.delete_user(u.id)}>Delete</Button>
               </td>
            </tr>
         );         
    });
      return(
         <tbody>
            {user}
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
               <ModalHeader toggle={this.toggle}>
                  Modal title
               </ModalHeader>
               <ModalBody>
               <Form>
  <FormGroup>
    <Label for="email">
      Email
    </Label>
    <Input
      invalid={false}
      id="email"
      name="email"
      placeholder="Email"
      type="email"
      value={this.state.userToEditEmail}
      onChange={e => this.setState({ userToEditEmail: e.target.value })}
    />
  </FormGroup>
  <FormGroup>
    <Label for="username">
      Username
    </Label>
    <Input
      id="username"
      name="username"
      placeholder="Username"
      type="username"
      value={this.state.userToEditUsername}
      onChange={e => this.setState({ userToEditUsername: e.target.value })}
    />
  </FormGroup>
  <FormGroup check>
    <Input type="checkbox"
     defaultChecked={this.state.userToEditIsAdmin}
      onChange={() => this.setState({ userToEditIsAdmin: !this.state.userToEditIsAdmin })} />
    <Label check>
      Admin
    </Label>
  </FormGroup>
</Form>
    </ModalBody>
    <ModalFooter>
      <Button
         onClick={() => {this.props.edit_user(
           this.state.userToEditId,
           this.state.userToEditUsername,
           this.state.userToEditEmail,
           this.state.userToEditIsAdmin);
           this.toggle_close();}}
        color="primary">
        Save
      </Button>
      <Button onClick={this.toggle}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
         </tbody>
         
      );
   }
}
  
  
 
 export default User;