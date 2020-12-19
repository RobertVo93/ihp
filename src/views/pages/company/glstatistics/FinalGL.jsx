import React, { Component } from 'react'
import CompanyGLStatisticDashboardByType from 'components/company/glstatistics/overview/GLStatisticsByType/CompanyGLStatisticDashboardByType'
import CompanyGLStatisticsBreakdownByType from 'components/company/glstatistics/overview/GLStatisticsByType/CompanyGLStatisticsBreakdownByType'
import CompanyGLStatisticsTopHospitals from 'components/company/glstatistics/overview/CompanyGLStatisticsTopHospitals'
import CompanyGLStatisticsOverMonth from 'components/company/glstatistics/overview/CompanyGLStatisticsOverMonth'

export class CompanyFinalGL extends Component {
    render() {
        return (
            <div>
                <div className="plr-15">
                    <div className="mtb-30 theme-color">
                        <div className="introduction">
                            Final GL Statistics Dashboard
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyGLStatisticDashboardByType GLType="Final" status="Final"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyGLStatisticsBreakdownByType GLType="Final" status="Final"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyGLStatisticsTopHospitals GLType="Final" status="Final"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyGLStatisticsOverMonth GLType="Final" status="Final"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CompanyFinalGL
