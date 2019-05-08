import React from 'react';
import StaffTable from './StaffTable';
import ButtonBar from './ButtonToolbar';
import StaffTableFilterForm from './StaffTableFilterForm'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class StaffBody extends React.Component {

	constructor(props) {
		super(props);

		this.deleteTableEntry = this.deleteTableEntry.bind(this);
		this.getFilterResult = this.getFilterResult.bind(this);
		this.clearFilterResult = this.clearFilterResult.bind(this);
		this.selectStaffTablePageNumber = this.selectStaffTablePageNumber.bind(this);

		this.state = {
			hasEntries: false,
			staffEntries: [],
			filteredEntries: [],
			staffTableActivePage: 0,
			staffTableEntriesToShow: 10,
		}
	}

	componentDidMount() {
		// Load all non deleted entries to build the datatable
		axios.get('http://localhost:1001/staff/getAllGridNonDeleted')
			.then(response => {
				let data = [];
				data.push(...response.data);
				this.setState({
					hasEntries: !this.state.hasEntries,
					staffEntries: data
				});
			})
	}

	deleteTableEntry(entryDocumentNumber, index) {

		axios.delete('http://localhost:1001/staff/get/' + entryDocumentNumber)

			.then(() => {


				if (this.state.filteredEntries.length > 0) {
					let filteredArray = this.state.filteredEntries;
					filteredArray.splice(index, 1);
					let entryArray = this.state.staffEntries.filter((entry) => { return entry.documentNumber !== entryDocumentNumber });

					this.setState({
						filteredEntries: filteredArray,
						staffEntries: entryArray
					});

				} else {
					let array = this.state.staffEntries;
					array.splice(index, 1);
					this.setState({
						staffEntries: array
					});
				}
			})

			.catch((error) => {
				console.log(error);
			})
	}

	getFilterResult(data) {
		let array = [];
		array.push(data);
		this.setState({
			filteredEntries: array,
			staffTableActivePage: 0
		});
	}

	clearFilterResult() {
		this.setState({
			filteredEntries: [],
			staffTableActivePage: 0
		});
	}

	selectStaffTablePageNumber(pageNumber) {
		this.setState({
			staffTableActivePage: pageNumber
		});
	}

	render() {

		// Prepare staff table data
		let staffEntries;
		let buttonCount;
		const activePage = this.state.staffTableActivePage;
		const entriesToShow = this.state.staffTableEntriesToShow;
		const initialPosition = activePage * entriesToShow;

		// Select filtered or normal data
		if (this.state.filteredEntries.length > 0) {
			staffEntries = this.state.filteredEntries;
		} else {
			staffEntries = this.state.staffEntries;
		}

		// Calculate pagination
		buttonCount = Math.ceil(staffEntries.length / this.state.staffTableEntriesToShow);
		staffEntries = staffEntries.slice(initialPosition, initialPosition + entriesToShow);

		return (
			<div className='container-fluid'>
				<StaffTableFilterForm
					className='Row'
					getFilterResult={this.getFilterResult}
					clearFilterResult={this.clearFilterResult} />
				<StaffTable
					className='Row'
					staffEntries={staffEntries}
					initialPosition={initialPosition}
					deleteTableEntry={this.deleteTableEntry} />
				<ButtonBar
					className='Row'
					buttonCount={buttonCount}
					onClick={this.selectStaffTablePageNumber} />
				<Link to='/staff/new' className='btn btn-primary m-1'>New Staff</Link>
			</div>
		);
	}
}