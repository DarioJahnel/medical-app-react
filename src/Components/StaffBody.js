import React from 'react';
import StaffForm from './StaffForm';
import StaffTable from './StaffTable';
import { Button } from 'reactstrap';
import axios from 'axios';

export default class StaffBody extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newStaff: false,
            editStaff: false,
            hasEntries: false
        }
    }

    staffEntries = [];

    componentDidMount() {
    // set state(fn, callback)
    axios.get('http://localhost:1001/staff/getAll')
    .then(response => {
      let data = [];
      data.push(...response.data);
      this.staffEntries = data;
      this.setState({
          hasEntries: !this.state.hasEntries
      });
    })
  }

    newStaffButton() {
        this.setState({
            newStaff: !this.state.newStaff,
        });
    }
    deleteStaffButton() {
        // axios delete
        return null;
    }

    clickRow(e) {
        e.currentTarget.className = 'active';
    }

    render() {

        if(this.state.newStaff) {
            return(
                <>
                <div className='row'>
                <StaffForm />
                </div>
                <div className='row'>
                <Button color='warning' onClick={() => this.newStaffButton()} className='my-1'>Return</Button>
                </div>
                </>

            );
        } else {
            return(
                <>
                <div className='Row'>
                    <h2>Staff options</h2>
                </div>
                <div className='Row'>
                    <StaffTable
                    staffEntries = {this.staffEntries}
                    onClick = {this.clickRow}/>
                    <Button color='primary' onClick={() => this.newStaffButton()} className='m-1'>New Staff</Button>
                    <Button color='primary' >Edit</Button>
                    <Button color='danger' onClick={() => this.deleteStaffButton()} className='m-1'>Delete</Button>
                </div>
                </>
            );
        }
    }


}
