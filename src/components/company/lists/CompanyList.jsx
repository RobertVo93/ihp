import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import CompActions from "redux/company/actions";
import { inActiveListIcon, activeListIcon, inActiveGridIcon, activeGridIcon, searchIcon } from "helper/constant";
import styled from "styled-components";
import classnames from "classnames";
import CompanyListGridView from "./CompanyListGridView";
import CompanyListTableView from "./CompanyListTableView";

const { getListCompanyByFilter, loadmoreCompanyList, clearCompanyList } = CompActions;
const CompanyListWrapper = styled.div`
    .header-container {
        .right-panel {
            .search-container {
                display: inline-block;
                position: relative;
                .search-icon {
                    position: absolute;
                    left: 11px;
                    top: 9px;
                }
                .search-box {
                    height: 30px;
                    width: 250px;
                    background: #FFFFFF;
                    border: 0.5px solid #ABB5C4;
                    box-sizing: border-box;
                    border-radius: 20px;
                    margin-right: 25px;
                    padding-left: 35px;
    
                    font-style: italic;
                    font-weight: 300;
                    font-size: 12px;
                    line-height: 18px;
                    color: #9696A0;

                    &:focus {
                        outline: none;
                    }
                }
            }
            .company-table-view,
            .company-grid-view {
                background: #FFFFFF;
                box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
                border-radius: 5px;
                width: 30px;
                height: 30px;
                border: none;
                padding: 0px;
                img {
                    padding-bottom: 1.5px;
                }
            }
            .company-table-view.active,
            .company-grid-view.active {
                background: #6E1C74;
            }
        }
    }
`
const CompanyList = (props) => {

    const [isTableView, setTableView] = useState(true);
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(20);
    const [searchText, setSearchText] = useState('');//text display on search box
    const [searchKey, setSearchKey] = useState('');//text after hit enter => become key search in database
    const [skipPageReset, setSkipPageReset] = useState(true);//flag to let table update the selected page to 1.
    const [sortBy, setSortBy] = useState(null);//sort by include {id: (db field), desc: true/false}

    useEffect(() => {
        // //load first page of list
        props.getListCompanyByFilter(props.authData, {
            skip, take, searchKey, sortBy
        });
    }, []);

    useEffect(() => {
        props.getListCompanyByFilter(props.authData, {
            skip, take, searchKey, sortBy
        });
    }, [skip, take, searchKey, skipPageReset, sortBy]);

    /**
     * Handle event onkeyup in search box
     * @param {*} e 
     */
    const onKeyUpHandler = (e) => {
        if (e.which === 13) {
            //Hit enter button => set search text for search key and refresh the selected page to 1
            setSkipPageReset(false);
            setSearchKey(searchText);
            setSkip(0);
        }
    }

    /**
     * Load more company by filter
     * @param {*} pageIndex 
     * @param {*} pageSize 
     */
    const loadmoreCompanyList = (pageIndex, pageSize) => {
        let tTake = pageSize || take;
        props.loadmoreCompanyList(props.authData, {
            skip: (pageIndex * tTake), take: tTake, searchKey
        });
    }

    /**
     * Get company by filter
     * @param {*} pageIndex 
     * @param {*} pageSize 
     * @param {*} sortBy 
     */
    const getCompanyList = (pageIndex, pageSize, sortBy) => {
        setSkipPageReset(true);
        setSkip(pageIndex * pageSize);
        let sortObj = null;
        if (sortBy && sortBy.length > 0) {
            sortObj = {
                id: sortBy[0].id,
                desc: sortBy[0].desc
            };
        }
        setSortBy(sortObj);
    }

    /**
     * Handle action switch view between table <-> grid
     * @param {*} isTableView 
     */
    const handleSwitchView = (isTableView) => {
        //set the pageIndex to 1;
        setSkipPageReset(false);
        setSkip(0);
        props.clearCompanyList();
        setTableView(isTableView);
    }

    return (
        <CompanyListWrapper>
            <div className="roe-card-style mt-15">
                <div className="roe-card-header">
                    <div className="row header-container">
                        <div className="float-left">
                            <p className="card-main-header">Company List</p>
                            <p className="card-sub-header">Overview of all time</p>
                        </div>
                        <div className="float-right right-panel">
                            <div className="search-container">
                                <img src={searchIcon} className="search-icon" />
                                <input
                                    type="text"
                                    className="search-box"
                                    value={searchText}
                                    onChange={e => {
                                        setSearchText(e.target.value || "");
                                    }}
                                    onKeyUp={e => onKeyUpHandler(e)}
                                    placeholder={`Search company name...`}
                                />
                            </div>
                            <Button className={classnames("company-table-view mr-10", isTableView && "active")}
                                onClick={() => handleSwitchView(true)}
                            >
                                <img src={isTableView ? activeListIcon : inActiveListIcon} />
                            </Button>
                            <Button className={classnames("company-grid-view", !isTableView && "active")}
                                onClick={() => handleSwitchView(false)}
                            >
                                <img src={!isTableView ? activeGridIcon : inActiveGridIcon} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="roe-card-body">
                    {
                        isTableView ?
                            <CompanyListTableView
                                data={props.companyData.list}
                                totalCompany={props.companyData.totalFilteredCompany}
                                loadmoreCallback={getCompanyList}
                                skipPageReset={skipPageReset}
                            />
                            :
                            <CompanyListGridView
                                data={props.companyData.list}
                                totalCompany={props.companyData.totalFilteredCompany}
                                loadmoreCallback={loadmoreCompanyList}
                            />
                    }
                </div>
            </div>
        </CompanyListWrapper>
    );
};

const mapStateToProps = state => {
    return {
        authData: {
            accessToken: state.auth.accessToken
        },
        companyData: {
            list: state.company.companyList,
            totalFilteredCompany: state.company.filteredCompanyCount
        }
    };
};

export default connect(mapStateToProps, { getListCompanyByFilter, loadmoreCompanyList, clearCompanyList })(
    CompanyList
);
