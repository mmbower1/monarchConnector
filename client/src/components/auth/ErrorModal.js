import React from 'react';
// import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';
import Modal from 'react-modal';

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

export default class ErrorModal extends React.Component {
  constructor() {
    super();

    this.state = {
      errorModalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = 'black';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    // console.log('error modal.props', this.props);
    this.state.errorModalIsOpen = this.props.open;

    return (
      <div>
        <Modal
          isOpen={this.state.errorModalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <h2 ref={subtitle => this.subtitle = subtitle}><strong>User not found.</strong></h2>
          <h5><strong>Please re-enter.</strong></h5>
          <br />
          <Button onClick={() => this.props.onErrorClose()}><strong>Close</strong></Button>
        </Modal>
      </div>
    );
  }
}