import React from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';

export default class StaffTable extends React.Component {

  renderTable() {

    return this.props.staffEntries.map((entry, index) => {

      if (!entry.deleted) {
        return (
          <tr align='center'>
            <th scope="row">{index + 1}</th>
            <td>{entry.documentNumber}</td>
            <td>{entry.documentType}</td>
            <td>
              <Button color='primary' className='m-1'>Edit</Button>
              <Button color='danger' onClick={() => this.props.deleteTableEntry(entry.documentNumber, index)}>Delete</Button>
            </td>
          </tr>
        );
      }

    });
  }

  render() {
    
    return (
      <Table hover className='col-8'>
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