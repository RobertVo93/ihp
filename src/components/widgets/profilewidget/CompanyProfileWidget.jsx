import React from "react";
import { Button } from "reactstrap";
import ProfileWrapper from "./profile.style";
import { ihpLogoV1 } from "helper/constant";
import MarqueeText from "components/forms/MarqueeText";

const CompanyProfileWidget = ({
  name,
  contactEmail,
  address,
  created,
  averageBill,
  totalBill,
  employeeCount,
  dependentCount,
  logo = ihpLogoV1,
  onEditProfileCallback
}) => {
  return (
    <ProfileWrapper>
      <div className="row">
        <div className="col-lg-6 col-sm-12 left-panel">
          <div className="header">
            <div className="main-header">
              Company Profile
              <Button
                className="edit-profile-btn"
                size="sm"
                onClick={onEditProfileCallback}
              >
                Edit Profile
              </Button>
            </div>
            <div className="sub-header">Overview of all times</div>
          </div>
          <div className="body-container row pt-10">
            <div className="col-3 logo">
              <img src={logo} />
            </div>
            <div className="col-5">
              <div className="company-name">
                <div className="label">Company Name</div>
                <MarqueeText text={name} className={"value"} />
              </div>
              <div className="contact-email mt-10">
                <div className="label">Contact email</div>
                <MarqueeText text={contactEmail} className={"value"} />
              </div>
            </div>
            <div className="col-4">
              <div className="location">
                <div className="label">Address</div>
                <MarqueeText text={address} className={"value"} />
              </div>
              <div className="created mt-10">
                <div className="label">Created</div>
                <MarqueeText text={created} className={"value"} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-sm-12 right-panel">
          <div className="header">
            <div className="main-header">Company Information</div>
            <div className="sub-header">Overview of all times</div>
          </div>
          <div className="body-container row pt-25">
            <div className="col-3">
              <MarqueeText text={averageBill} className={"value"} />
              <div className="label">Average bill</div>
            </div>
            <div className="col-3">
              <MarqueeText text={totalBill} className={"value"} />
              <div className="label">Total bill</div>
            </div>
            <div className="col-3">
              <MarqueeText text={employeeCount} className={"value"} />
              <div className="label">Employee count</div>
            </div>
            <div className="col-3">
              <MarqueeText text={dependentCount} className={"value"} />
              <div className="label">Dependent count</div>
            </div>
          </div>
        </div>
      </div>
    </ProfileWrapper>
  );
};

export default CompanyProfileWidget;
