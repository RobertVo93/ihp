import React from "react";
import HeaderWrapper from "./header.style";
import { email } from "helper/constant";
import { noti } from "helper/constant";
import { AppName } from "helper/constant";
import { useSelector } from "react-redux";


const Header = props => {

    const mainColor = useSelector(state => state.auth.mainColor)
    const subColor = useSelector(state => state.auth.subColor)
    
    return (
        <HeaderWrapper {...props}>
            <div className="headerBack" style={{background: mainColor}}>
                <div className="flex-x align-center">
                    <div className="pl-10 flex-1">
                        <p style={{color: subColor , fontWeight: "bold", marginLeft: 20}}>{AppName}</p> 
                    </div>
                    <div className="pl-10" style={{display: "flex" , alignItems: "center", marginRight: 20}}>
                        <label htmlFor="" style={{position: "relative", margin: 0}}>
                            <input placeholder="Type to search..." type="text" className="header-search"/>
                            <i style={{position: "absolute", left: 13, top: "50%" , transform: "translateY(-50%)", color:"#4A5568", fontSize: 12}} className="fa fa-search"></i>
                        </label>
                        <div className="header-icon-custom header-email" style={{margin: "0px 30px"}}>
                            <img src={email} alt=""/>
                        </div>
                        <div className="header-icon-custom header-noti">
                            <img src={noti} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </HeaderWrapper>
    );
};


export default Header
