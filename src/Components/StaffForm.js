import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class StaffForm extends React.Component {

	constructor(props) {
		super(props);
		this.newStaffEntry = this.newStaffEntry.bind(this);
		this.onSubmitMethod = '';
		this.state = {
			newStaffFields: {
				documentNumber: '',
				documentType: '',
				name: '',
				surname: '',
				email: '',
				phoneNumber: '',
				birthDate: ''
			},
			edit: false,
			errors: ''
		}
	}

	componentDidMount() {
		//Check if it's editing - set state to complete inputs value
		const browserUrl = this.props.location.pathname;
		if (browserUrl.search('edit') !== -1) {
			this.onSubmitMethod = e => this.editStaffEntry(e);
			// Get entry based on documentNumber
			const that = this;
			axios.get('http://localhost:1001/staff/get/' + that.props.match.params.id)
				.then(response => {
					that.setState({
						newStaffFields: {
							...response.data
						},
						edit: true
					});
				})
		} else {
			this.onSubmitMethod = e => this.newStaffEntry(e);
			console.log(this.onSubmitMethod);
		}

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
			return (
				<li key={entry[0]}>{entry[0] + ": " + entry[1]}</li>
			)
		})
	}

	newStaffEntry(e) {
		e.preventDefault();
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
						birthDate: '',
					},
					errors: ['Staff created succesfully'],
				});
				setTimeout(() => that.props.history.push('/staff/'), 500);
			})
			.catch(function (error) {
				console.log(error);
				that.setState({ errors: [error] });
			});
	}

	editStaffEntry(e) {
		e.preventDefault();
		axios.put('http://localhost:1001/staff/get/' + this.state.newStaffFields.documentNumber, this.state.newStaffFields)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			})
	}

	render() {
		// Build errors div on top of form
		let errors = () => {
			if (this.state.errors !== '') {

				return (
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
				{console.log(this.onSubmitMethod)}
				<Form onSubmit={(e) => this.onSubmitMethod(e)}>
					<FormGroup>
						<Label for="documentNumber">Document Number:</Label>
						<Input disabled={this.state.edit && true} type="number" name="documentNumber" id="documentNumber" placeholder="27897456"
							value={this.state.newStaffFields.documentNumber} onChange={(e) => this.changeHandler(e)} />
					</FormGroup>
					<FormGroup>
						<Label for="documentType">Document Type</Label>
						<Input type="text" name="documentType" id="documentType" placeholder="DNI"
							value={this.state.newStaffFields.documentType} onChange={(e) => this.changeHandler(e)} />
					</FormGroup>
					<FormGroup>
						<Label for="name">Name</Label>
						<Input type="text" name="name" id="name" placeholder="Dario"
							value={this.state.newStaffFields.name} onChange={(e) => this.changeHandler(e)} />
					</FormGroup>
					<FormGroup>
						<Label for="surname">Surname</Label>
						<Input type="text" name="surname" id="surname" placeholder="Perez"
							value={this.state.newStaffFields.surname} onChange={(e) => this.changeHandler(e)} />
					</FormGroup>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input type="email" name="email" id="email" placeholder="example@gmail.com"
							value={this.state.newStaffFields.email} onChange={(e) => this.changeHandler(e)} />
					</FormGroup>
					<FormGroup>
						<Label for="phoneNumber">Phone Number</Label>
						<Input type="phoneNumber" name="phoneNumber" id="phoneNumber" placeholder="4889-7897"
							value={this.state.newStaffFields.phoneNumber} onChange={(e) => this.changeHandler(e)} />
					</FormGroup>
					<FormGroup>
						<Label for="birthDate">Birth Date</Label>
						<Input type="date" name="birthDate" id="birthDate"
							value={this.state.newStaffFields.birthDate} onChange={(e) => this.changeHandler(e)} />
					</FormGroup>
					<Button type='submit'>Submit</Button>
					<Link to='/staff/' className='btn btn-warning my-1'>Return</Link>
				</Form>
			</>
		);
	}
}

export default withRouter(StaffForm);