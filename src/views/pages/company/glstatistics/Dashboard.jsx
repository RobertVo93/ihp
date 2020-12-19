
import CompanyGLStatisticOverviewTopDashboard from 'components/company/glstatistics/overview/CompanyGLStatisticDashboard'
import CompanyGLStatisticsBreakdown from 'components/company/glstatistics/overview/CompanyGLStatisticsBreakdown'
import CompanyGLStatisticsDecline from 'components/company/glstatistics/overview/CompanyGLStatisticsDecline'
import CompanyGLStatisticsOverMonth from 'components/company/glstatistics/overview/CompanyGLStatisticsOverMonth'
import CompanyGLStatisticsTopHospitals from 'components/company/glstatistics/overview/CompanyGLStatisticsTopHospitals'
import React from 'react'

const CompanyGLStatisticsDashboard = () => {
    return (
        <div>
            <div className="plr-15">
                <div className="mtb-30 theme-color">
                    <div className="introduction">
                        GL Statistics Dashboard
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <CompanyGLStatisticOverviewTopDashboard
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <CompanyGLStatisticsBreakdown
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <CompanyGLStatisticsDecline
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <CompanyGLStatisticsTopHospitals
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <CompanyGLStatisticsOverMonth
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CompanyGLStatisticsDashboard
