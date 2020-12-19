import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageTitle from 'components/common/PageTitle';

class Intro extends Component {

    render() {

        const { sidebarTheme } = this.props

        const activeColor = {
            color: sidebarTheme.activeColor
        }

        return (
            <div>
                <div className="plr-15">
                    <div className="mtb-30 theme-color">
                        <div className="introduction" style={activeColor}>
                            Under Construction
                        </div>
                        <div className="mtb-10">
                            This page is under construction, please come again later.
                        </div>
                        <div className="mtb-10">
                            We removed all the components, views, on this page.
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

export default connect(mapStateToProps, null)(Intro);