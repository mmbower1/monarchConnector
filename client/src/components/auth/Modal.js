import React, {Component} from 'react';
import { Button } from 'reactstrap';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
// import { Redirect } from 'react-router'

class ModalExample extends Component {
	constructor() {
		super();
		
		this.state = {
			modalIsOpen: false,
			balance: '1000',
		};

		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	afterOpenModal() {
		this.subtitle.style.color = 'black';
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}

    openModalWithBalance(item) {
		this.setState({
			openDeleteModal: true,
			balance: this.state.item.balance,
		})
	}

	render() {
		
		const customStyles = {
			content : {
				top: '50%',
				left: '50%',
				right: 'auto',
				bottom: 'auto',
				marginRight: '-50%',
				transform: 'translate(-50%, -50%)',
				fontFamily: 'Montserrat',
				background: '#ae4c05b6', /* fallback for old browsers */
				background: '-webkit-linear-gradient(to left, #f9d423, #9d7510b6)', /* Chrome 10-25, Safari 5.1-6 */
				background: 'linear-gradient(to right, rgb(179, 155, 33), #ae4c05b6)',
				borderRadius: '5px'
			}
		};

		this.state.modalIsOpen = this.props.open;
		
		this.state.balance = this.props.balance;

		return (
			<div>
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					// contentLabel="Example Modal"
        		>
					<br></br>
					<h5><strong>Thanks for participating! Tokens are sent Fridays, 12pm PST</strong></h5>
					<br />
					<h6 ref={subtitle => this.subtitle = subtitle}><strong>Your balance is: </strong></h6>
					<h4><strong>{this.state.balance} MT</strong></h4>
					<h6><strong>
						Please note* This registration only applies to those who never received MTP for their Bounty 
						Participation. For those who hold MTP, we have a separate system to swap your MTP for MT.<br></br>
						Please go to our <a className="highlight" href="">Telegram Channel</a> Here for information about how to swap your MTP for MT.<br></br>
						Lastly, for your MT to show up in your Wallet, please make sure you update your Android or iOS 
						wallets to the most recent version.  You can download the most recent version at <a className="highlight" href="http://monarchwallet.com/#download">MonarchWallet.com. </a><br></br><br></br>
						If you gave an ETH address from MEW etc, then you’ll need to look up a tutorial on how to 
						add MT to your MEW wallet.  You can find those on Google/Youtube.
					</strong></h6>
					<br />
					<a href="https://monarchtoken.io">
						<Button onClick={() => this.props.onClose()}><strong>Done</strong></Button>
					</a>
        		</Modal>
			</div>
		);
	}
}

export default ModalExample;