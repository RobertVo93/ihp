import RoleManagementTable from 'components/account/RoleManagementTable/RoleManagementTable'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  userActions  from 'redux/account/actions'

const { getAllRoles } = userActions

const RoleManagement = () => {
    const roles = useSelector(state => state.account.roles)
    const dispatch = useDispatch()
    const  authData = {
        accessToken: useSelector(state => state.auth.accessToken)
    }

    useEffect(() => {
        dispatch(getAllRoles(authData))
        return () => {}
    }, [])

    return (
        <div>
            <div className="row">
            <div className="col-lg-12">
                <RoleManagementTable tData={roles} />
            </div>
        </div>
        </div>
    )
}

export default RoleManagement
