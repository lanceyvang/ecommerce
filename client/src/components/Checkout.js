import React from 'react';
import { Container, Box, Heading, TextField, Text } from 'gestalt';
import ToastMessage from './ToastMessage';
import { getCart, calculatePrice } from '../Utils';

class Checkout extends React.Component {
	state = {
		cartItems: [],
		address: '',
		postalCode: '',
		city: '',
		confirmationEmailAddress: '',
		toast: false,
		toastMessage: ''
	};

	componentDidMount() {
		this.setState({ cartItems: getCart() });
	}

	handleChange = ({ event, value }) => {
		event.persist();
		this.setState({ [event.target.name]: value });
	};

	handleConfirmOrder = async (event) => {
		event.preventDefault();

		if (this.isFormEmpty(this.state)) {
			this.showToast('Fill in all fields');
		}
	};

	isFormEmpty = ({ address, postalCode, city, confirmationEmailAddress }) => {
		return !address || !postalCode || !city || !confirmationEmailAddress;
	};

	showToast = (toastMessage) => {
		this.setState({ toast: true, toastMessage });
		setTimeout(() => this.setState({ toast: false, toastMessage: '' }), 5000);
	};

	render() {
		const { toast, toastMessage, cartItems } = this.state;
		return (
			<Container>
				<Box
					color='darkWash'
					margin={4}
					padding={4}
					shape='rounded'
					display='flex'
					justifyContent='center'
					alignItems='center'
					direction='column'
				>
					{/* Checkout Form Heading */}
					<Heading color='midnight'>Checkout</Heading>
					{/* React.Fragment is how we group multiple items without using a DIV */}
					{cartItems.length > 0 ? (
						<React.Fragment>
							{/* User Cart */}
							<Box
								display='flex'
								justifyContent='center'
								alignContent='center'
								direction='column'
								marginTop={2}
								marginBottom={6}
							>
								<Text color='darkGray' italic>
									{cartItems.length} Items for Checkout
								</Text>
								<Box padding={2}>
									{cartItems.map((item) => (
										<Box key={item._id} padding={1}>
											<Text color='midnight'>
												{item.name} X {item.quantity} - ${item.quantity * item.price}
											</Text>
										</Box>
									))}
								</Box>
								<Text bold>Total Amount: {calculatePrice(cartItems)}</Text>
							</Box>
							{/* Checkout Form */}
							<form
								style={{
									display: 'inline',
									textAlign: 'center',
									maxWidth: 450
								}}
								onSubmit={this.handleConfirmOrder}
							>
								{/* Shipping Address Input */}
								<TextField
									id='address'
									type='text'
									name='address'
									placeholder='Shipping Address'
									onChange={this.handleChange}
								/>
								{/* Postal Code Input */}
								<TextField
									id='postalCode'
									type='number'
									name='postalCode'
									placeholder='Postal Code'
									onChange={this.handleChange}
								/>
								{/* City Input */}
								<TextField
									id='city'
									type='text'
									name='city'
									placeholder='City of Residence'
									onChange={this.handleChange}
								/>
								{/* Confirmation Email Address Input */}
								<TextField
									id='confirmationEmailAddress'
									type='email'
									name='confirmationEmail Adress'
									placeholder='Confirmation Email Address'
									onChange={this.handleChange}
								/>
								<button id='stripe__button' type='submit'>
									Submit
								</button>
							</form>
						</React.Fragment>
					) : (
						<Box color='darkWash' shape='rounded' padding={4}>
							<Heading align='center' color='watermelon' size='xs'>
								Your Cart Is Empty
							</Heading>
							<Text align='center' italic color='green'>
								Add some brews!
							</Text>
						</Box>
					)}
				</Box>
				<ToastMessage show={toast} message={toastMessage} />
			</Container>
		);
	}
}

export default Checkout;
