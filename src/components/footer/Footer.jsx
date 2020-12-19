import React from "react";
import FooterWrapper from "./footer.style";
import Button from "components/button/Button";

const Footer = props => {
	return (
		<FooterWrapper {...props}>
			<div className="footerBack flex-x align-center">
				<div className="flex-1 fs-13 bold-text footer-text">
					© 2020 IHP Sdn Bhd, All rights reserved.
        </div>
				<div>

				</div>
			</div>
		</FooterWrapper>
	);
};

export default Footer;
