import React from 'react';
import { Button, ButtonGroup, ButtonToolbar } from 'reactstrap';

export default class ButtonBar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			activeButton: 1
		}
	}

	clickButton(index) {
		this.props.onClick(index);
		this.setState({
			activeButton: index + 1
		});
	}

	renderButtons(quantity) {
		let buttonArray = [];
		let activeButton = this.state.activeButton;

		for (let index = 0; index < quantity; index++) {
			// If active button change color
			buttonArray.push(
				<Button
					color={(activeButton === index + 1 && 'success') || ('secondary')}
					onClick={() => this.clickButton(index)}
					key={index + 1}>{index + 1}</Button>
			);
		}
		return buttonArray;
	}
	render() {

		return (
			<ButtonToolbar className='justify-content-center'>
				<ButtonGroup>
					{this.renderButtons(this.props.buttonCount)}
				</ButtonGroup>
			</ButtonToolbar>
		);
	}
}