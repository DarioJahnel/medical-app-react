import React from 'react';
import { Table } from 'reactstrap';

export default class StaffTable extends React.Component {

  renderTable() {
    return this.props.staffEntries.map((entry,index) => {
      return(
        <tr onClick={(e) => this.props.onClick(e)}>
          <th scope="row">{index + 1}</th>
          <td>{entry.documentNumber}</td>
          <td>{entry.documentType}</td>
        </tr>
      );
    });
  }

  render() {


    return (
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Document Number</th>
            <th>Document Type</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTable()}
        </tbody>
      </Table>
    );
  }
}