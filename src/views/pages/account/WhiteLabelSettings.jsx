import WhiteLabelSettingsTable from 'components/account/WhiteLabelSettingsTable/WhiteLabelSettingsTable'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  userActions  from 'redux/account/actions'

const { getLabelSettings } = userActions

const WhiteLabelSettings = () => {
    const labelSettings = useSelector(state => state.account.labelSettings)
    const dispatch = useDispatch()
    const  authData = {
        accessToken: useSelector(state => state.auth.accessToken)
    }

    useEffect(() => {
        dispatch(getLabelSettings(authData))
        return () => {}
    }, [])

    return (
        <div>
            <div className="row">
            <div className="col-lg-12">
                <WhiteLabelSettingsTable tData={labelSettings} />
            </div>
        </div>
        </div>
    )
}

export default WhiteLabelSettings
