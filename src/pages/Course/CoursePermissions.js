import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getCourse, getRolesOfUserCourse } from '../../redux/actions/courseActions';

const CoursePermissions = (props) => {
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [userRoles, setUserRoles] = useState([])

    const getUsersRole = (user, course) => {
        const res = axios.get("http://localhost:8800/api/courses-shared/" + user + "/" + course)
        setUserRoles(res.data)
    }

    useEffect(() => {
        if(userInfo) getUsersRole(userInfo._id, props.course)
    }, [props, props.course, getUsersRole, userInfo])
    

    let couldShow = false;
    if(userRoles){
        couldShow = userRoles.some( role =>  props.permissionRequired.includes(role['_id']) )
    }
    
    if(props.coursePublic){
        couldShow = true;
    }
    // console.log(couldShow)
    return couldShow ? props.children : props.errorReturn;
};

export const ShowForPermission = CoursePermissions;