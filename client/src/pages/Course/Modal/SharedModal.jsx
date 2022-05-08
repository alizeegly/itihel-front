import React, { useEffect, useState } from 'react'
import "./course-shared.scss"
import Modal from 'react-modal'
import { FaTimes } from "react-icons/fa";
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Checkbox from 'react-simple-checkbox'
import { FiEdit2 } from 'react-icons/fi';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: 35,
      width: "40%",
      zIndex: 1000
    },
    overlay: {zIndex: 1000}
};
Modal.setAppElement('#root');


const CourseSharedModal = ({modal, user, userroles, courseid, id}) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const navigate = useNavigate()
    const [courseShared, setCourseShared] = useState({user_id: "", roles: [], course_id: ""})

    function openModal() {
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
    }

    const getUsers = async () => {
        try {
            const users = await axios.get("/api/users/")
            setUsers(users.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getRoles = async () => {
        try {
            const roles = await axios.get("/api/roles/")
            setRoles(roles.data)
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleOnSelect = (item) => {
        setCourseShared({
            ...courseShared,
            user_id: item._id
        })
    }

    const formatResult = (item) => {
        return item
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setCourseShared({
            ...courseShared,
            course_id: courseid
        })
        if(modal === "edit"){
            if(courseShared.user_id !== "" && courseShared.course_id !== "" && courseShared.roles.length > 0){
                console.log(courseShared)
                axios.put("/api/courses-shared/" + id, courseShared)
                    .then((res) => {
                        console.log("modifié")
                        navigate("/courses/" + courseid + "/parameters")
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        } else if(modal === "add") {
            if(courseShared.user_id !== "" && courseShared.course_id !== "" && courseShared.roles.length > 0){
                console.log(courseShared)
                axios.post("/api/courses-shared/", courseShared)
                    .then((res) => {
                        console.log("ajouté")
                        navigate("/courses/" + courseid + "/parameters")
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }

    const handleChange = async (e, role) => {
        // const roleObject = await axios.get("/api/roles/find/" + role._id)
        console.log("e:", e, " -- role:", role)
        if(e === true){
            console.log("here")
            let c2 = courseShared.roles
            c2.push(role)
            setCourseShared({
                ...courseShared,
                roles: c2
            })
        } else {
            console.log("there")
            const index = courseShared.roles.findIndex(function (r) {
                return r._id === role._id;
            })
            let c2 = courseShared.roles
            c2.splice(index, 1)
            setCourseShared({
                ...courseShared,
                roles: c2
            })
        }
    }

    useEffect(()=>{
        getUsers()
        getRoles()
        if(modal === "edit"){
            userroles && userroles.length > 0 && userroles.forEach(r => {
                let chr = courseShared.roles 
                courseShared.roles.push(r) 
                setCourseShared({
                    ...courseShared,
                    roles: chr, user_id: user._id
                })
            });
        }
    }, [])
    
    return (
        <>
            {
                modal === "add" ? (
                    <button className="button-modal" onClick={openModal}>+</button>
                ) : (
                    <button className="button-icon-modal" onClick={openModal}><FiEdit2/></button>
                )
            }
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="modal">
                    <FaTimes className="closeIcon" onClick={closeModal}/>
                    <form onSubmit={handleSubmit}>
                        <h1 className="title">{modal === "add" ? "Partager le cours avec" : "Modifier les rôles"}</h1>
                        <div className="form">
                            <div className="form_inputs">
                                {
                                    modal === "add" ? (
                                        <div className="form__item">
                                            <label>Utilisateur</label>
                                            <ReactSearchAutocomplete
                                                items={users}
                                                fuseOptions={{ keys: ["pseudo"] }}
                                                // onSearch={handleOnSearch}
                                                onSelect={handleOnSelect}
                                                autoFocus
                                                formatResult={formatResult}
                                                resultStringKeyName="pseudo"
                                                showIcon={false}
                                                placeholder="@..."
                                                styling={
                                                    {
                                                        border: "none",
                                                        outline: "none"
                                                    }
                                                }
                                            />
                                        </div>
                                    ) : null
                                }
                                <div className="form__item">
                                    <label>Rôles</label>
                                    {
                                        roles.filter(role => role.identifiant !== "ROLE_ADMIN").map(role => (
                                            <div className="roles" key={role._id}>
                                                <Checkbox 
                                                    color="#94DDDE"
                                                    onChange={(e) => handleChange(e, role)} 
                                                    size="3"
                                                    checked={courseShared && courseShared.roles.length > 0 ? courseShared.roles.find(r => r._id === role._id) ? true : false : false}
                                                    id={role.id}
                                                    className="role-checkbox"
                                                />
                                                <label for={role.id}>{role.name}</label>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="form__buttons">
                            <button className="button-save" type="submit">Ajouter</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default CourseSharedModal