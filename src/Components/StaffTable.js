import React from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class StaffTable extends React.Component {

	renderTable() {
		const initialPosition = this.props.initialPosition;
		
		return this.props.staffEntries.map((entry, index) => {
			if (!entry.deleted) {
				return (
					<tr align='center' key={initialPosition + index + 1}>
						<th scope="row">{initialPosition + index + 1}</th>
						<td>{entry.documentNumber}</td>
						<td>{entry.documentType}</td>
						<td>
							<Link to={`/staff/edit/${entry.documentNumber}`} className='btn btn-primary m-1'>Edit</Link>
							<Button color='danger' onClick={() => this.props.deleteTableEntry(entry.documentNumber, index)}>Delete</Button>
						</td>
					</tr>
				);
			}
		});
	}

	render() {

		return (
			<Table size='small' striped hover className='col-8'>
				<thead>
					<tr align='center'>
						<th>#</th>
						<th>Document Number</th>
						<th>Document Type</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{this.renderTable()}
				</tbody>
			</Table>
		);
	}
}