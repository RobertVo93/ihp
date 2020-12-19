import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageTitle from 'components/common/PageTitle';

class AMViewClaims extends Component {

    //get the data here


    render() {

        const { sidebarTheme } = this.props

        const activeColor = {
            color: sidebarTheme.activeColor
        }

        return (
            <div>
                {/*<PageTitle title="View Claims" />*/}

                <div className="plr-15">
                    <div className="mtb-30 theme-color">
                        <div className="introduction" style={activeColor}>
                            List of Claims
                        </div>
                        <div className="mtb-10">
                            <div className="row">
                                <div className="col-lg-12">

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.themeChanger
    };
}

export default connect(mapStateToProps, null)(AMViewClaims);