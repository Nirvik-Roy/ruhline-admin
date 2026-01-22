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
import { getUserDetails } from '../../utils/user.js'
const Navbar = () => {
    const [dropdown, setdropdown] = useState(false);
    const [userData, setuserData] = useState();
    const [userLoading, setuserLoading] = useState()
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


    const userDataFetch = async () => {
        setuserLoading(true)
        try {
            const result = await getUserDetails();
            setuserData(result)
        } catch (err) {
            console.log('User data fethced failed')
        } finally {
            setuserLoading(false)
        }
    }

    useEffect(() => {
        userDataFetch()
    }, [])
    return (
        <>
            {(isLoading || userLoading) && <Loaders />}
            {modalOpen.password && <ChangePasswordModal modalFunction={modalFunction} />}
            {modalOpen.profile && <ChangeProfileModal userData={userData} userDataFetch={userDataFetch} modalFunction={modalFunction} />}
            <div className='navbar_wrapper'>
                <div className='container navbar_content_wrapper'>
                    <img src={logo} />
                    <div className='navbar_logout_wrapper'>
                    <div style={{
                        display:'flex',
                        justifyContent:'flex-end',
                        alignItems:'center',
                        gap:'10px',
                        width:'fit-content'
                    }}>
                        <div>
                            <h5 style={{
                                textAlign:'right'
                            }}>{userData?.first_name && userData?.first_name} {userData?.last_name && userData?.last_name}</h5>
                            <small style={{
                                fontSize:'0.7rem'
                            }}>{userData?.email && userData?.email}</small>
                        </div>
                        <img onClick={(() => { setdropdown(!dropdown) })} style={{
                            backgroundColor: userData?.profile_photo && 'transparent',
                            padding: userData?.profile_photo && '0px',
                            width: userData?.profile_photo && '35px',
                            height: userData?.profile_photo && '35px',
                            borderRadius: userData?.profile_photo && '50%',
                            objectFit: userData?.profile_photo && 'cover',
                        }} src={userData?.profile_photo ? userData?.profile_photo : user} />
                    </div>
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
