import {Row,Col,Button,Table,NavItem,NavLink,Nav,TabContent,TabPane,FormGroup,Label,ModalHeader,ModalBody,Modal,Form,Input,ModalFooter} from 'reactstrap';
import React, { Component } from 'react';
import axios from 'axios'



class ModalUserAdd extends Component{
    
    constructor(props){
        super(props)
        
        this.addUserModalToggle = this.addUserModalToggle.bind(this);

        this.state = {
            addUserModal: false,
        }
    }

    addUserModalToggle(){
        this.setState({
          addUserModal: !this.state.addUserModal,
            userToAddEmail: '',
            userToAddUsername: '',
            userToAddIsAdmin: false
        })
      }
    render(){
        return(
            <div>
            <Modal isOpen={this.state.addUserModal} toggle={this.addUserModalToggle}>
            <ModalHeader toggle={this.addUserModalToggle}>
               Modal title
            </ModalHeader>
            <ModalBody>
            <Form>
<FormGroup>
 <Label for="email">
   Email
 </Label>
 <Input
   id="email"
   name="email"
   placeholder="Email"
   type="email"
   value={this.state.userToAddEmail}
   onChange={e => this.setState({ userToAddEmail: e.target.value })}
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
   value={this.state.userToAddUsername}
   onChange={e => this.setState({ userToAddUsername: e.target.value })}
 />
</FormGroup>
<FormGroup check>
 <Input type="checkbox"
  defaultChecked={this.state.userToAddIsAdmin}
   onChange={() => this.setState({ userToAddIsAdmin: !this.state.userToAddIsAdmin })} />
 <Label check>
   Admin
 </Label>
</FormGroup>
</Form>
 </ModalBody>
 <ModalFooter>
   <Button
     color="primary"
     onClick={() => {this.props.addUser(this.state.userToAddUsername,
                                      this.state.userToAddEmail,
                                      this.state.userToAddIsAdmin); this.addUserModalToggle()}}
     >
     Add
   </Button>
   <Button onClick={this.addUserModalToggle}>
     Cancel
   </Button>
 </ModalFooter>
</Modal>
<Button onClick={this.addUserModalToggle}>Add User</Button>
 </div>
        );
    }
}

export default ModalUserAdd;