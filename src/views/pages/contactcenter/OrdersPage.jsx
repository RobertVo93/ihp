import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrdersAllTable from 'components/contactcenter/OrdersTableAll';

class OrdersPage extends Component {

    render() {
        return (
            <div>
                <div className="plr-15">
                    <div className="mtb-30 theme-color">
                        <div className="introduction">
                            Underwriting Orders
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <OrdersAllTable />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
}

export default connect(mapStateToProps, null)(OrdersPage);
