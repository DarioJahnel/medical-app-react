import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class StaffForm extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      newStaffFields: {
        documentNumber: '',
        documentType: '',
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        birthDate: '',},
      errors: "",

    }
  }

  onSubmit(e) {
    e.preventDefault();
    const axios = require('axios');
    const that = this;

    axios.post('http://localhost:1001/staff/create', this.state.newStaffFields)
    .then(function (response) {
      console.log(response);
      that.setState({
        newStaffFields: {
          documentNumber: '',
          documentType: '',
          name: '',
          surname: '',
          email: '',
          phoneNumber: '',
          birthDate: '',},
        errors: '',
    });
      alert('Staff created successfully');
    })
    .catch(function (error) {
      that.setState({errors: error.response.data});
    });
  }

  changeHandler(e) {
    const id = e.target.id;
    const value = e.target.value;

    this.setState({
      newStaffFields: {
            ...this.state.newStaffFields,
            [id]: value
      }
    });
  }

  renderErrors() {
    return Object.entries(this.state.errors).map(entry => {
      return(
        <li>{entry[0] + ": " + entry[1]}</li>
      )
    })
  }

  render() {

    let errors = () => {
      if(this.state.errors != '') {
        
        return(
          <div className='col-12'>
            <ul>
              {this.renderErrors()}
            </ul>
          </div>
        );
      }
      return (<div className='col-12'></div>);
    }

    return (
      <>
      {errors()}

      {/* Formulary */}
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label for="documentNumber">Document Number:</Label>
          <Input type="number" name="documentNumber" id="documentNumber" placeholder="27897456" 
            value={this.state.documentNumber} onChange={(e) => this.changeHandler(e)}/>
        </FormGroup>
        <FormGroup>
          <Label for="documentType">Document Type</Label>
          <Input type="text" name="documentType" id="documentType" placeholder="DNI"
            value={this.state.documentType} onChange={(e) => this.changeHandler(e)}/>
        </FormGroup>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" placeholder="Dario"
            value={this.state.name} onChange={(e) => this.changeHandler(e)}/>
        </FormGroup>
        <FormGroup>
          <Label for="surname">Surname</Label>
          <Input type="text" name="surname" id="surname" placeholder="Perez"
            value={this.state.surname} onChange={(e) => this.changeHandler(e)}/>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" placeholder="example@gmail.com"
            value={this.state.email} onChange={(e) => this.changeHandler(e)}/>
        </FormGroup>
        <FormGroup>
          <Label for="phoneNumber">Phone Number</Label>
          <Input type="phoneNumber" name="phoneNumber" id="phoneNumber" placeholder="4889-7897"
            value={this.state.phoneNumber} onChange={(e) => this.changeHandler(e)}/>
        </FormGroup>
        <FormGroup>
          <Label for="birthDate">Birth Date</Label>
          <Input type="date" name="birthDate" id="birthDate"
            value={this.state.birthDate} onChange={(e) => this.changeHandler(e)}/>
        </FormGroup>
        <Button type='submit'>Submit</Button>
      </Form>
      </>
    );
  }
}