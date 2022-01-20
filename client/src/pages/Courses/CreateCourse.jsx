import React, {useState} from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Container from '../../components/User/Container'
import "./createcourse.scss"
import Modal from 'react-modal'
import { FaTimes } from "react-icons/fa";
import { useSession } from  'react-use-session'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: 35,
      width: "40%"
    }
};

Modal.setAppElement('#root');

const CreateCourse = () => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const { session, saveJWT, clear } = useSession('itihel') // Récup session itihel
    const navigate = useNavigate()
    const [course, setCourse] = useState({
        title: "",
        text: {},
        isPublic: false,
        owner_id: session.user.id,
        profile_picture: "",
        categories: [],
        description: ""
    })

    function openModal() {
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
    }

    const handleChange = e => {
        setCourse({
          ...course,
          [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("/api/courses/", course) // Lien create course de l'api
            .then((res) => {
                console.log("ajouté !")
                navigate("/courses") // redirect vers page listes des courses
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <button className="add_cours" onClick={openModal}>Créer un cours</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="modal">
                    <FaTimes className="closeIcon" onClick={closeModal}/>
                    <form onSubmit={handleSubmit}>
                        <h1 className="title">Créer un cours</h1>
                        <div className="form">
                            <div className="form_inputs">
                                <div className="form__item">
                                    <label>Titre</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="title"
                                        value={course.title}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form__item">
                                    <label>Description</label>
                                    <textarea 
                                        type="text" 
                                        name="description"
                                        className="form-control description" 
                                        value={course.description}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form__buttons">
                            <button type="submit">Ajouter</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default CreateCourse