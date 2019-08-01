import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<div>
			<section className="landing">
				<div className="dark-overlay">
					<div className="landing-inner">
						<h1 className="x-large">Token Redemption</h1>
					
						<div className="buttons">
							<Link to="/register" className="btn btn-light">
								Claim Your Tokens
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Landing;
