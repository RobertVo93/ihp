import React, { Component } from 'react';
import CompanyGLStatisticsOverMonth from 'components/company/glstatistics/overview/CompanyGLStatisticsOverMonth'
import CompanyGLStatisticsTopHospitals from 'components/company/glstatistics/overview/CompanyGLStatisticsTopHospitals'
import CompanyGLStatisticDashboardByType from 'components/company/glstatistics/overview/GLStatisticsByType/CompanyGLStatisticDashboardByType'
import CompanyGLStatisticsBreakdownByType from 'components/company/glstatistics/overview/GLStatisticsByType/CompanyGLStatisticsBreakdownByType'

export class CompanyInitialGL extends Component {
    render() {
        return (
            <div>
                <div className="plr-15">
                    <div className="mtb-30 theme-color">
                        <div className="introduction">
                            Initial GL Statistics Dashboard
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyGLStatisticDashboardByType GLType="Init" status="Initial"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyGLStatisticsBreakdownByType GLType="Init" status="Initial"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyGLStatisticsTopHospitals GLType="Init" status="Initial"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyGLStatisticsOverMonth GLType="Init" status="Initial"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CompanyInitialGL
