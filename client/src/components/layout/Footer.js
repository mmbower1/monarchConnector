import React from 'react';
import { MDBContainer, MDBRow, MDBFooter } from 'mdbreact';


const Footer = () => {
	return (
		<div className="footer-container">
            <MDBFooter color="black" className="font-small pt-4 mt-4">
                <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                    <p>
                        &copy; 2019 Monarch Blockchain Corporation, all rights reserved.
                    </p>
                    <h5 className="title">
                        <a href="https://monarchtoken.io/contact/">Contact Support</a>
                    </h5>
                </MDBRow>
                </MDBContainer>
            </MDBFooter>
		</div>
	);
};

export default Footer;
