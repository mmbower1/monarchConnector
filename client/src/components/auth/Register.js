import React, { Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import pic from '../../img/monarch-logo2400.png';
import ModalExample from './Modal';
import ErrorModal from './ErrorModal';
import ThirdModal from './ThirdModal';
import FinalPage from './FinalPage';
import { Link } from 'react-router-dom'
// import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
// import Modal from 'react-modal';
let newUser;
let subscription;

const Register = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        wallet: '',
        checkbox: null
    });

    const [formSubscription, setformSubscription] = useState(false);

    const [showFinalPage, setShowFinalPage] = useState(false);

    const [stateBalance, setStateBalance] = useState(0);

    const { email, wallet, checkbox } = formData;

    useEffect(() => {
        // console.log("formSubscription in useEffect: " + formSubscription);
        subscription = formSubscription;
    });

    // for when typing email/wallet in forms
    const onChange = e => {
        console.log("onChange called");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onChangeSubscription = e => {
        console.log("onChangeSubscription: " + e.target.id);
        if(e.target.id === "subscription_yes"){
            console.log("Setting subscription to true...");
            setformSubscription(true);
            console.log("After end of if true: " + formSubscription);
        }
        else {
            console.log("Setting subscription to false...");
            setformSubscription(false);
            console.log("After end of if false: " + formSubscription);
        }
        console.log("Subscription is now " + formSubscription);
    }

    let balance = 0;

    // when final page gets submitted
    const finalPageSubmit = async e => {
        e.preventDefault();
        console.log("Changing finalPage to true...");

        setShowFinalPage(true);
        console.log("finalPage is true: " + setShowFinalPage(true));
        console.log("finalPageSubmit subscription: " + formSubscription);
        
        newUser = {
            email: email.toLowerCase().trim(),
            wallet: wallet.trim(),
            checkbox
        };

        console.log("newUser: " + JSON.stringify(newUser));
    }

    // only allow 1 onSubmit per person to deny access 
    const onSubmit = async e => {
        e.preventDefault();
        newUser.subscription = formSubscription;
        console.log("newUser: " + JSON.stringify(newUser));
        // var sel = document.getElementById('participation');
        // let participation = sel.value;

        // const newUser = {
        //     email,
        //     wallet,
        //     checkbox,
        // };
        
        console.log("in onSubmit formSubscription: " + formSubscription);
        console.log("in onSubmit  subscription: " + subscription);

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
        }

        setStateBalance(balance);
    }
    
    // ===================================== Final Page Markup ===========================================
    // let section_final = <section className="finalPageContainer" > Final Page </section>;
    let section_final = <section className="container">
    <img src={pic} className="monarchlogopic" alt="ml"></img>
    <br />
        <div className="token-redemption-title">
            <h1 className="text-dark"><strong>Token Redemption</strong></h1>
        </div>
        <br />
        <small className="form-text">
            Do you want to receive updates, news, special offers & future giveaway announcements 
            from us or our partners through joining our official email list?<br></br><br></br>
            Please note, by checking Yes, you agree with our <a className="highlight" href="https://monarchwallet.com/privacy-policies/">Privacy Policy</a>. Also, you can unsubscribe by 
            clicking the "unsubscribe" link at the bottom of any email we send.
        </small>
        <br/>
        
        <form className="form" onSubmit={e => onSubmit(e)} > 
        <div>
            <div className="subscribe btn-group" data-toggle="buttons">
                <label id="yesCheckbox" className="subscription_checkboxes btn btn-warning">
                    <input type="radio"
                            name="subscription" 
                            id="subscription_yes" 
                            value={true} 
                            // value={subscription_no}
                            onChange={e => onChangeSubscription(e)}
                            required 
                        /> Yes &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="glyphicon glyphicon-ok"></span>
                </label>
                <label className="subscription_checkboxes btn btn-warning">
                    <input type="radio"
                        name="subscription" 
                        id="subscription_no" 
                        value={false} 
                        // value={subscription_no}
                        onChange={e => onChangeSubscription(e)}
                        required
                    /> No
                    <span className="glyphicon glyphicon-ok"></span>
                </label>
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
        </div>
        </form>
        <br />
</section>



    // ===================================== Entry Page Markup ===========================================
    // let section_entry = <button id="final_button" onClick={showFinalPageFunction}>Show Final Page</button>;
    let section_entry = <section className="container">
    <img src={pic} className="monarchlogopic" alt="ml"></img>
    <br />
    <div className="token-redemption-title">
        <h1 className="text-dark"><strong>Token Redemption</strong></h1>
    </div>
    <br />
    <small className="form-text">
        Monarch Values Your Participation in our Bounty/Airdrop programs. The process for claiming your Monarch Tokens (MT) is simple and straightforward.
        Simply enter the Email and Ethereum address you used when participating. You must agree to our Terms & Conditions by clicking the checkbox and then finish the registration completely by following the instructions on the following page.<br /> <br />
        Once your registration is complete, we will check your Email and Ethereum Address against our database and adjust the total tokens sent to you adjusting for fake accounts/fake referrals, etc. This is to protect legitimate participants and punish those who tried to game our referral system.
        Once the token amount is adjusted, the total MT will be sent to your corresponding ETH address within a week once you’ve finished registration.<br /> <br />
        Please note this registration only applies to those who never received MTP for their Bounty Participation.<br></br> For those who hold MTP, we have a separate system to swap your MTP for MT.<br></br><br></br> Please go to our <a className="highlight" href="https://t.me/MonarchToken">Telegram Channel</a> for information about how to swap your MTP for MT.<br></br><br></br>
        Lastly, for your MT to show up in your Wallet, please make sure you update your Android or iOS wallets to the most recent version.  You can download the most recent version at <a className="highlight" href="http://monarchwallet.com/#download">MonarchWallet.com</a>
    </small>
    <br />
     {/* <form className="form" onSubmit={e => onSubmit(e)} onClick={this.setIsModalOpen}> */}
    <form className="form" onSubmit={e => finalPageSubmit(e)} >
        <div id="email-form" className="form-group">
            <input type="email"
                className="form-fillout"
                placeholder="Enter Email Address"
                name="email"
                value={email}
                onChange={e => onChange(e)}
                required
            />
        </div>
        <div id="wallet-form" className="form-group">
            <input type="text"
                className="form-fillout"
                placeholder="Enter ERC 20 (ETH) Address"
                name="wallet"
                value={wallet}
                onChange={e => onChange(e)} 
                minLength="40"
                required
            />
        </div>
        {/* <select id="participation" className="dropdown-form-group" name="participation" required>
            <option name="Default" value="" selected disabled>Select Participation</option>
            <option name="Bounty" value="bounty">Bounty</option>
            <option name="Crowdsale" value="crowdsale">Crowdsale</option>
        </select> */}
        <div className="form-group">
            <label className="checkboxes">
                <input type="checkbox"
                    name="checkbox"
                    className="form-fillout"
                    value={checkbox}
                    onChange={e => onChange(e)}
                    required
                />&nbsp;&nbsp;I agree to the <a className="highlight" href="https://monarchwallet.com/privacy-policies/">Monarch TERMS & CONDITIONS</a>
                <small className="form-text"></small>
            </label>
        </div>
        <input type="submit"
            className="btn btn-primary"
            value="Proceed To Next Step"
            id="claimtokens"
            // onClick={this.setIsModalOpen}
            // onErrorClick={this.setIsErrorModalOpen}
        />
    </form>
</section>

	return (
		<Fragment>
            {showFinalPage ? section_final :  section_entry}	
            <ModalExample open={isModalOpen} balance={stateBalance} onClose={() => setIsModalOpen(false)}/>
            <ErrorModal open={isErrorModalOpen} onErrorClose={() => setIsErrorModalOpen(false)}/>
            <ThirdModal open={isThirdModalOpen} onErrorClose={() => setIsThirdModalOpen(false)}/>
		</Fragment>
	);
};

export default Register;
