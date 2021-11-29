import {Row,Col,Button,Table,NavItem,NavLink,Nav,TabContent,TabPane,FormGroup,Label,ModalHeader,ModalBody,Modal,Form,Input,ModalFooter} from 'reactstrap';
import React, { Component } from 'react';
import axios from 'axios'



class ModalGroupAdd extends Component{
    
    constructor(props){
        super(props)
        this.addGroupModalToggle = this.addGroupModalToggle.bind(this);
        this.onChangeMulti = this.onChangeMulti.bind(this)
        this.state = {
            addGroupModal: false,
        }
    }

    addGroupModalToggle(){
        this.setState({
          addGroupModal: !this.state.addGroupModal,
            groupToAddName: '',
            groupToAddDescription: '',
            StatusFilter: [],
        })
      }


      onChangeMulti = (event) => {
        let opts = [],
           opt;
        for (let i = 0, len = event.target.options.length; i < len; i++) {
           opt = event.target.options[i];
           if (opt.selected) {
              opts.push(parseInt(opt.value));
           }
        }
        this.setState({
           StatusFilter: opts
        });
     }
    

    render(){
        const user = this.props.users.map((u) => {
            return (
                <option value={u.id}>
                {u.username}
                </option>
            );         
        });

        return(
            <div>
            <Modal isOpen={this.state.addGroupModal} toggle={this.addGroupModalToggle}>
            <ModalHeader toggle={this.addGroupModalToggle}>
               Modal title
            </ModalHeader>
            <ModalBody>
            <Form>
              <FormGroup>
                <Label for="name">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Name"
                  type="name"
                  value={this.state.groupToAddName}
                  onChange={e => this.setState({ groupToAddName: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  type="textarea"
                  value={this.state.groupToAddDescription}
                    onChange={e => this.setState({ groupToAddDescription: e.target.value })}
                />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelectMulti">
                    Select Multiple
                  </Label>
                  <Input
                    id="exampleSelectMulti"
                    multiple
                    name="selectMulti"
                    type="select"
                    multiple value={this.state.StatusFilter}
                    onChange={(event) => {this.onChangeMulti(event);}}
                  >
                  {user}
                  </Input>
                </FormGroup>
            </Form>
          </ModalBody>
         <ModalFooter>
          <Button
            color="primary"
            onClick={() => {this.props.addGroup(this.state.groupToAddName,
                                              this.state.groupToAddDescription,
                                              this.state.StatusFilter); this.addGroupModalToggle()}}
            >
            Add
          </Button>
          <Button onClick={this.addGroupModalToggle}>
            Cancel
          </Button>
          </ModalFooter>
        </Modal>
        <Button onClick={this.addGroupModalToggle}>Add Group</Button>
      </div>
        );
    }
}

export default ModalGroupAdd;
