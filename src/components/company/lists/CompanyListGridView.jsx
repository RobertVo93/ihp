import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import { ihpLogoV1 } from "helper/constant";
import { moneyFormat, numberFormat } from "helper/numberFormat";

const CompanyCardWrapper = styled.div`
    text-align: center;
    margin: 10px -10px;
    .company-card {
        height: 284px;
        padding: 15px;
        background: #FFFFFF;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
        border-radius: 4px;
        .company-name {
            font-style: normal;
            font-weight: bold;
            font-size: 12px;
            line-height: 18px;
            color: #000000;
            padding-bottom: 20px
        }
        .company-body {
            position: absolute;
            top: 90px;
            width: 85%;
            .total-bill {
                padding-top: 30px;
                .total-value {
                    font-weight: bold;
                    font-size: 20px;
                    line-height: 32px;
                    color: #2F80ED;
                }
            }
            .other-info {
                padding-top: 10px;
                font-style: normal;
                font-weight: normal;
                font-size: 10px;
                line-height: 20px;
                color: #000000;
    
                .average-bill,
                .employee-count,
                .dependent-count {
                    font-style: normal;
                    font-weight: bold;
                    font-size: 14px;
                    line-height: 18px;
                    color: #2F80ED;
                    padding-left: 0px !important;
                    padding-right: 0px !important;
                }
            }
            .info-label {
                font-family: Noto Sans;
                font-style: normal;
                font-weight: normal;
                font-size: 12px;
                line-height: 20px;
                color: #000000;
            }
        }
    }
`;
const GridViewWrapper = styled.div`
    height: calc(100vh - 255px);
    overflow: hidden auto;
    .infinity-scroll-wrapper {
        margin-left: 5px;
        margin-right: 5px;
    }
`;
const CompanyListGridView = ({
    data,
    totalCompany,
    loadmoreCallback
}) => {

    const [listCompany, setListCompany] = useState([]);
    const [currentNoCompany, setCurrentNoCompany] = useState(0);

    /**
     * ComponentDidUpdate: watch on props.data
     */
    useEffect(() => {
        let tData = [];
        if (data) {
            data.forEach((val) => {
                tData.push({
                    CoyName: val.CoyName
                    , AverageBill: "$" + moneyFormat(parseFloat(val.AverageBill))
                    , TotalBill: "$" + moneyFormat(parseFloat(val.TotalBill))
                    , EmployeeCount: numberFormat(parseFloat(val.EmployeeCount))
                    , DependentCount: numberFormat(parseFloat(val.DependentCount))
                });
            });
        }
        setListCompany(tData);
        setCurrentNoCompany(tData.length);
    }, [data]);

    const CompanyCard = (props) => {
        return (
            <CompanyCardWrapper>
                <div className="roe-card-style company-card">
                    <div className="company-name">{props.companyInfo.CoyName}</div>
                    <div className="company-body">
                        <div className="company-logo"><img src={ihpLogoV1} height="60" /></div>
                        <div className="total-bill">
                            <div className="total-value">{props.companyInfo.TotalBill}</div>
                            <div className="info-label">Total bill</div>
                        </div>
                        <div className="other-info row">
                            <div className="average-bill col-4">
                                <div>{props.companyInfo.AverageBill}</div>
                                <div className="info-label">Average bill</div>
                            </div>
                            <div className="employee-count col-4">
                                <div>{props.companyInfo.EmployeeCount}</div>
                                <div className="info-label">Employee</div>
                            </div>
                            <div className="dependent-count col-4">
                                <div>{props.companyInfo.DependentCount}</div>
                                <div className="info-label">Dependent</div>
                            </div>
                        </div>
                    </div>
                </div>
            </CompanyCardWrapper>
        )
    };

    return (
        <GridViewWrapper>
            <InfiniteScroll
                className="row infinity-scroll-wrapper"
                pageStart={-1}
                loadMore={(e) => {
                    if (currentNoCompany < totalCompany) {
                        loadmoreCallback(e);
                    }
                }
                }
                hasMore={currentNoCompany < totalCompany}
                useWindow={false}>
                {
                    listCompany.map((val) => (
                        <div className="col-lg-3 col-sm-4">
                            <CompanyCard companyInfo={val} />
                        </div>
                    ))
                }
            </InfiniteScroll>
        </GridViewWrapper>
    );
};

export default CompanyListGridView;
