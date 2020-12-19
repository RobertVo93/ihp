import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import  userActions  from 'redux/account/actions'

const { checkResetPassword } = userActions

const Newpassword = (props) => {
    // const {token} = 
    const {token} = useParams()
    const resetToken = useSelector(state => state.account.resetInfo?.resetPasswordToken)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkResetPassword({ token }))
    }, [])

    useEffect(() => {
        if (resetToken) {
            props.history.push("/createnewpassword")
        }
    }, [resetToken])

    return (
        <div>
            Redirecting...
        </div>
    )
}

export default Newpassword;
