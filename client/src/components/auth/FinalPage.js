import React, { Fragment, useState } from 'react';
import pic from '../../img/monarch-logo2400.png';
import axios from 'axios';
import ModalExample from './Modal';
import ErrorModal from './ErrorModal';
import ThirdModal from './ThirdModal';
import { Link } from 'react-router-dom'

const FinalPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        wallet: '',
        checkbox: null,
    });

    const [stateBalance, setStateBalance] = useState(0);

    const { email, wallet, checkbox } = formData;

    // Set formData here
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    let balance = 0;

    // only allow 1 onSubmit per person to deny access 
    const onSubmit = async e => {
        e.preventDefault();

        // console.log("onSubmit pre setIsModalOpen");
        // setIsModalOpen(true);
        // console.log("onSubmit post setIsModalOpen");

        // var sel = document.getElementById('participation');
        // let participation = sel.value;

        const newUser = {
            email,
            wallet,
            checkbox,
        };

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(newUser);

            console.log("Pre api call");
            const res = await axios.post('/api/users', body, config);
            console.log("Post api call");
            console.log("");
            console.log("Transaction: ");
            console.log(res.data.transaction);
            console.log("Printing out response from /api/users");
            console.log("");
            console.log(JSON.stringify(res, null, 2));
            console.log("");
            const success = res.data.success;
            const transaction = res.data.transaction;

            // Show user not found if success false AND transaction is false
            if (!success && !transaction) {
                setIsErrorModalOpen(true);
            }
            // Show user already conducted transaction if transaction is true
            else if(transaction) {
                setIsThirdModalOpen(true);
            } 
            // Show success modal
            else {
                setIsModalOpen(true);
                balance = res.data.user.balance;
            }
        } catch(err) {
            console.error(err);
            // 
        }

        setStateBalance(balance);
    }

    return (
        <Fragment>
            <ModalExample open={isModalOpen} balance={stateBalance} onClose={() => setIsModalOpen(false)}/>
            <ErrorModal open={isErrorModalOpen} onErrorClose={() => setIsErrorModalOpen(false)}/>
            <ThirdModal open={isThirdModalOpen} onErrorClose={() => setIsThirdModalOpen(false)}/>

            <section className="container">
                <img src={pic} className="monarchlogopic" alt="ml"></img>
                <br />
                    <div className="token-redemption-title">
                        <h1 className="text-dark"><strong>Token Redemption</strong></h1>
                    </div>
                    <br />
                    <small className="form-text">
                        Do you want to receive updates, news, special offers & future giveaway announcements 
                        from us or our partners through joining our official email list?<br></br><br></br>
                        Please note, by checking Yes, you agree with our Privacy Policy. Also, you can unsubscribe by 
                        clicking the "unsubscribe" link at the bottom of any email we send.
                    </small>
                    <br/>
                    <div>
                        <input type="checkbox"
                            className="yesCheckbox" 
                            name="checkbox" 
                            // value={checkbox} 
                            onChange={e => onChange(e)}
                            required
                        /> Yes &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="checkbox"
                            className="noCheckbox" 
                            name="checkbox" 
                            // value={checkbox} 
                            onChange={e => onChange(e)}
                            required 
                        /> No
                    </div>
                    <br/>
                    <br/>
                    <input type="submit"
                        className="btn btn-primary" 
                        value="Claim Tokens"
                        id="claimtokens"
                        // onClick={this.setIsModalOpen}
                        // onErrorClick={this.setIsErrorModalOpen}
                    />
                    <br />
            </section>
        </Fragment>
    )
}

export default FinalPage;
