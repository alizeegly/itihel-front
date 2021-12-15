import React, { useEffect, useState } from 'react'
import "./course-shared.scss"
import Modal from 'react-modal'
import { FaTimes } from "react-icons/fa";
import { useSession } from  'react-use-session'
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

const EditCourseSharedModal = ({course}) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const navigate = useNavigate()
    const [courseShared, setCourseShared] = useState({
        "course_id": course,
        "user_id": "",
        "roles": []
    })

    function openModal() {
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setCourseShared({...courseShared, course_id: course})
        if(courseShared.user_id !== "" && courseShared.course_id !== "" && courseShared.roles.length > 0){
            axios.post("/api/courses-shared/", courseShared)
                .then((res) => {
                    console.log("ajouté")
                    navigate("/courses/" + course)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const handleChange = async (e, role) => {
        const roleObject = await axios.get("/api/roles/find/" + role)
        if(e === true){
            let c2 = courseShared.roles
            c2.push(roleObject.data)
            setCourseShared({
                ...courseShared,
                roles: c2
            })
        } else {
            const index = courseShared.roles.findIndex(function (r) {
                return r._id === role;
            })
            let c2 = courseShared.roles
            c2.splice(index, 1)
            setCourseShared({
                ...courseShared,
                roles: c2
            })
        }
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
            // roles.data.forEach(role => {
            //     rolesChecked[role._id] = false
            // });
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

    useEffect(()=>{
        getUsers()
        getRoles()
    }, [])

    console.log(courseShared)

    return (
        <>
            <button className="button-icon-modal" onClick={openModal}><FiEdit2/></button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="modal">
                    <FaTimes className="closeIcon" onClick={closeModal}/>
                    <form onSubmit={handleSubmit}>
                        <h1 className="title">Partager le cours avec</h1>
                        <div className="form">
                            <div className="form_inputs">
                                <div className="form__item">
                                    <label>User</label>
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
                                <div className="form__item">
                                    <label>Roles</label>
                                    {
                                        roles.filter(role => role.identifiant !== "ROLE_ADMIN").map(role => (
                                            <div className="roles" key={role._id}>
                                                <Checkbox 
                                                    color="#94DDDE"
                                                    onChange={(e) => handleChange(e, role._id)} 
                                                    size="3"
                                                    checked={courseShared.roles.length > 0 ? courseShared.roles.find(r => r._id === role._id) ? true : false : false}
                                                />
                                                <label>{role.name}</label>
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

export default EditCourseSharedModal