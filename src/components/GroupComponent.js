import React, { Component } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import {Row,Col,Button,Table,NavItem,NavLink,Nav,TabContent,TabPane,FormGroup,Label,ModalHeader,ModalBody,Modal,Form,Input,ModalFooter} from 'reactstrap';


class Group extends Component{

   constructor(props){
      super(props)

      this.onChangeMulti = this.onChangeMulti.bind(this);
      this.editGroupModalToggle = this.editGroupModalToggle.bind(this);
      this.ModalCloseOnSuccess = this.ModalCloseOnSuccess.bind(this)

      this.state = {
         editGroupModal: false,
     }
   }


   ModalCloseOnSuccess(){
      this.setState({
         editGroupModal: !this.state.editGroupModal,
      })

   }

   editGroupModalToggle(groupToEdit){
      this.setState({
        editGroupModal: !this.state.editGroupModal,
          groupToEditId: groupToEdit.id, 
          groupToEditName: groupToEdit.name,
          groupToEditDescription: groupToEdit.description,
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
      const group = this.props.groups.map((g) => {
         let work_names = []
         g.work_names.split('').forEach(function(item,index){
            if (item == '1')
               work_names.push(true)
            else if (item == '0')
               work_names.push(false)
            else
               console.log('ERROR WITH WORK_NAMES')
         })

         function changeWorksNames(index){
            work_names[index] = !work_names[index]
            let config = {
               headers: {
                   'Access-Control-Allow-Origin': '*',
               }
             }
           let data = {
            'id': g.id,
            'work_names': work_names
           }
           axios.post('http://127.0.0.1:8000/groups/work-names/',data,config)
           .then(response => {
               // handle success
               console.log(response['data']);
           })
           .catch(error => {
           // handle error
               console.log(error);
           })
           .then(() => {
            //  this.props.getGroupsList()
             });
         }

        return(
               <tr>
                  <th>{g.id}</th>
                  <td>{g.name}</td>
                  <td><Input type="checkbox" defaultChecked={work_names[0]} onChange={() => changeWorksNames(0)} /></td>
                  <td><Input type="checkbox" defaultChecked={work_names[1]} onChange={() => changeWorksNames(1)} /></td>
                  <td><Input type="checkbox" defaultChecked={work_names[2]} onChange={() => changeWorksNames(2)}/> </td>
                  <td><Input type="checkbox" defaultChecked={work_names[3]} onChange={() => changeWorksNames(3)}/></td>

                  <td>
                     <Button onClick={() => this.editGroupModalToggle(g)}>Edit</Button>
                     <Button onClick={() => this.props.deleteGroup(g.id)} >Delete</Button>
                  </td>
               </tr>
        );
    });

    const user = this.props.users.map((u) => {

      return (
          <option value={u.id}>
          {u.username}
          </option>
      );         
  });
    return(
       <tbody>
         {group}
         <Modal isOpen={this.state.editGroupModal} toggle={this.editGroupModalToggle}>
         <ModalHeader toggle={this.editGroupModalToggle}>
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
type="username"
value={this.state.groupToEditName}
onChange={e => this.setState({ groupToEditName: e.target.value })}
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
   value={this.state.groupToEditDescription}
     onChange={e => this.setState({ groupToEditDescription: e.target.value })}
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
  onClick={() => {this.props.editGroup(this.state.groupToEditId,
                                   this.state.groupToEditName,
                                   this.state.groupToEditDescription,
                                   this.state.StatusFilter);this.ModalCloseOnSuccess()}}
  >
  Edit
</Button>
<Button onClick={this.editGroupModalToggle}>
  Cancel
</Button>
</ModalFooter>
</Modal>
       </tbody>


    );

   }
}

export default Group;