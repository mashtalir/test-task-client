import {Row,Col,Button,Table,NavItem,NavLink,Nav,TabContent,TabPane,FormGroup,Label,ModalHeader,ModalBody,Modal,Form,Input,ModalFooter} from 'reactstrap';
import React, { Component } from 'react';



class UnsuccessfullDeleteModal extends Component{
    constructor(props){
        super(props)
    }


    render(){
        return(
            <Modal
            isOpen={this.props.unsuccessfulDelete}
            toggle={this.props.toggleUnsuccessfulDelete}
          >
            <ModalHeader toggle={this.props.toggleUnsuccessfulDelete}>
              Unavailable operation
            </ModalHeader>
            <ModalBody>
                 You cant delete group, when users are assigned to it
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.props.toggleUnsuccessfulDelete}>
                Ok
              </Button>
            </ModalFooter>
          </Modal>
        );
    }
}
export default UnsuccessfullDeleteModal;