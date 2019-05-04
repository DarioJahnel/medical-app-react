import React from 'react';
import StaffForm from './StaffForm';
import StaffTable from './StaffTable';
import { Button } from 'reactstrap';
import axios from 'axios';

export default class StaffBody extends React.Component {

	constructor(props) {
		super(props);

		this.deleteTableEntry = this.deleteTableEntry.bind(this);
		this.newStaffCompleted = this.newStaffCompleted.bind(this);
		this.state = {
			newStaff: false,
			editStaff: false,
			hasEntries: false,
			staffEntries: []
		}
	}

	componentDidMount() {
		// set state(fn, callback)
		axios.get('http://localhost:1001/staff/getAllNonDeleted')
			.then(response => {
				let data = [];
				data.push(...response.data);
				this.setState({
					hasEntries: !this.state.hasEntries,
					staffEntries: data
				});
			})
	}

	newStaffHandler() {
		this.setState({
			newStaff: !this.state.newStaff,
		});
	}

	newStaffCompleted(documentNumber, documentType) {
		console.log("entrevieja");
		let array = this.state.staffEntries;
		array.push({ documentNumber, documentType });
		this.setState({
			staffEntries: array
		});
	}

	deleteTableEntry(entryDocumentNumber, index) {

		axios.delete('http://localhost:1001/staff/get/' + entryDocumentNumber)

			.then(() => {
				let array = this.state.staffEntries;
				array.splice(index, 1);
				this.setState({
					staffEntries: array
				});
			})

			.catch((error) => {
				console.log(error);
			})
	}

	render() {

		if (this.state.newStaff) {
			return (
				<>
					<div className='row'>
						<StaffForm
							newStaffCompleted={this.newStaffCompleted} />
					</div>
					<div className='row'>
						<Button color='warning' onClick={() => this.newStaffHandler()} className='my-1'>Return</Button>
					</div>
				</>

			);
		} else {
			return (
				<>
					<div className='Row'>
						<h2>Staff options</h2>
					</div>
					<div className='Row'>
						<StaffTable
							staffEntries={this.state.staffEntries}
							deleteTableEntry={this.deleteTableEntry} />
						<Button color='primary' onClick={() => this.newStaffHandler()} className='m-1'>New Staff</Button>
					</div>
				</>
			);
		}
	}


}
