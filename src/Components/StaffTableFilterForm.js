import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

export default class StaffForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			documentNumber: ''
		}
	}

	changeHandler(e) {
		const id = e.target.id;
		const value = e.target.value;

		this.setState({
			[id]: value
		});
	}

	searchStaffEntry(e) {
		e.preventDefault();
		const that = this;

		axios.get('http://localhost:1001/staff/get/' + that.state.documentNumber)
			.then(response => {
				that.props.getFilterResult(response.data);
			})
	}

	render() {
		return (
			<>
				<h6>Search Filters</h6>
				<Form onSubmit={(e) => { this.searchStaffEntry(e) }}>
					<FormGroup row>
						<Label for="documentNumber" className='d-inline p-2'>Document Number:</Label>
						<Input type="number" name="documentNumber" id="documentNumber" placeholder="27897456"
							value={this.state.documentNumber} onChange={(e) => this.changeHandler(e)} className='col-3 d-inline' />
						<Button type='Button submit' className='mx-1'>Search!</Button>
						<Button className='Button mx-1' onClick={() => this.props.clearFilterResult()}>Clear filters</Button>
					</FormGroup>
				</Form>
			</>
		);
	}
}
