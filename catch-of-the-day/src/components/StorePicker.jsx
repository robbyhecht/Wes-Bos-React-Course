import React from 'react';
import { getFunName } from "../helpers";


class StorePicker extends React.Component {

	// constructor() { // *
	// 	super(); // runs the component that we're extending first (React.Component in this case)
	// 	this.goToStore = this.goToStore.bind(this); // creates StorePicker instance
	// }

	myInput = React.createRef();

	goToStore = event => { // **
		// 1. stop the form from submitting
		event.preventDefault();
		// 2. get the text from that input
		const storeName = this.myInput.current.value;
		console.log(storeName)
		// 3. change the page to /store/whatever-they-entered
		this.props.history.push(`/store/${storeName}`);
	};
  render() {
    return (
			<form className="store-selector" onSubmit={this.goToStore}>
					<h2>Please Enter A Store</h2>
					<input
						type="text"
						ref={this.myInput}
						required
						placeholder="Store Name"
						defaultValue={getFunName()}
					/>
					<button type="submit">Visit Store -></button>
			</form>
		)
	}
}
 
export default StorePicker;

	// * runs before StorePicker --> replaced by arrow functions
	// ** arrow syntax binds the value of 'this' to the store picker component by declaring goToStore as a property rather than a method and then we set it to the fat arrow function. Replaces Constructor.