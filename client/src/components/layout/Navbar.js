import React from 'react';
import miniPic from '../../img/mini-logo.png';
// import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="navbar bg-dark">
			<h4>
				<img src={miniPic} className="monarchlogominipic" alt="ml"></img>
				<span id="backtomonarchtoken"></span>
			</h4>
		</nav>
	);
};

export default Navbar;
