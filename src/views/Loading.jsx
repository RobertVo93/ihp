import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { connect } from 'react-redux';

const LoadingPage = props => {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(props.loadingData.loading);
        //alert(props.loadingData.loading);
    }, [props.loadingData]);

    return (
        <div>
            {loading && <div style={{ width: "100%", height: "100%", position: "absolute", zIndex: "10000", backgroundColor: "rgb(0,0,0,0.5)" }}>
                <div style={{ marginLeft: "45%", marginTop: "10%" }}>
                    <ReactLoading
                        type={"bars"} color={"white"} height={'20%'} width={'20%'}
                    />
                    <h3 style={{ marginLeft: "-7%", color: "white" }}>Loading please wait...</h3>
                </div>
            </div>
            }
        </div>
    );
};


const mapStateToProps = state => {
    return {
        loadingData: {
            loading: state.utilities.loading,
        },
    };
};

export default connect(
    mapStateToProps,
    {}
)(LoadingPage);


// If you want to choose different color schema go to settings/index.jsx and set your theme and language.

// If you want to change sidebar nav list then go to util/data/sidebar.jsx
