import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/Frame 1984078480.svg'
import user from '../../assets/g10332.svg'
import logout from '../../assets/Group (1).svg'
import ChangePasswordModal from '../../View/Modal/ChangePasswordModal'
import ChangeProfileModal from '../../View/Modal/ChangeProfileModal'
import UpdateName from '../../View/Modal/UpdateName'
import { useDispatch, useSelector } from 'react-redux'
import { AuthlogOut } from '../../Store/Slices/Loginslice/AuthSlice'
import Loaders from '../../Components/Loaders/Loaders.jsx'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const [dropdown, setdropdown] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoading, isLogin } = useSelector(state => state.auth)
    const [modalOpen, setmodalOpen] = useState({
        password: false,
        profile: false,
        name: false
    })
    const modalFunction = (id) => {
        setmodalOpen({
            password: id == 3 ? true : false,
            profile: id == 2 ? true : false,
            name: id == 1 ? true : false
        })
    }
    const LogoutFunc = () => {
        dispatch(AuthlogOut())
    }
    useEffect(() => {
        if (!isLogin) {
            navigate('/')
        }
    }, [isLogin, navigate])
    return (
        <>
            {isLoading && <Loaders />}
            {modalOpen.password && <ChangePasswordModal modalFunction={modalFunction} />}
            {modalOpen.profile && <ChangeProfileModal modalFunction={modalFunction} />}
            <div className='navbar_wrapper'>
                <div className='container navbar_content_wrapper'>
                    <img src={logo} />
                    <div className='navbar_logout_wrapper'>
                        <img onClick={(() => { setdropdown(!dropdown) })} src={user} />
                        <img onClick={(() => LogoutFunc())} src={logout} />
                        {dropdown && <div className='user_dropdown'>
                            <div className='user_square'></div>
                            <p onClick={(() => modalFunction(2))}>Update Name And Profile Picture</p>
                            <p onClick={(() => modalFunction(3))}>Change Password</p>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
