import AccountManagementTable from 'components/account/AccountManagementTable/AccountManagementTable'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  userActions  from 'redux/account/actions'

const { getUserInfo } = userActions

const AccountManagement = () => {
    const userInfo = useSelector(state => state.account.userInfo)
    const dispatch = useDispatch()
    const  authData = {
        accessToken: useSelector(state => state.auth.accessToken)
    }

    useEffect(() => {
        dispatch(getUserInfo(authData))
        return () => {}
    }, [])

    return (
        <div>
            <div className="row">
                <div className="col-lg-12">
                    <AccountManagementTable tData={userInfo} />
                </div>
            </div>
        </div>
    )
}

export default AccountManagement
