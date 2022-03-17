import React, {createRef, useState} from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Container from '../../components/User/Container'
import Modal from 'react-modal'
import { FaTimes } from "react-icons/fa";
import { useSession } from  'react-use-session'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import {
    CloudUpload as UploadIcon,
    Edit as EditIcon,
} from "@mui/icons-material";

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

const CreateCourse = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const { session, saveJWT, clear } = useSession('itihel') // Récup session itihel
    const navigate = useNavigate()
    const [course, setCourse] = useState({
        title: "",
        text: "",
        isPublic: false,
        owner_id: session.user.id,
        profile_picture: "",
        categories: [],
        description: ""
    })
    const inputFileRef = createRef(null);
    const [image, _setImage] = useState(null);

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
                setIsOpen(false)
                props.handleCallback(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const cleanup = () => {
        URL.revokeObjectURL(image);
        inputFileRef.current.value = null;
    };

    const setImage = (newImage) => {
        if (image) {
            cleanup();
        }
        _setImage(newImage);
        const pic = "picture"
        setCourse({ ...course, [pic]: newImage })
    };

    const handleOnChangeImage = (event) => {
        console.log(event)
        const newImage = event.target?.files?.[0];

        if (newImage) {
            setImage(URL.createObjectURL(newImage));
        }
    };

    const handleClick = (event) => {
        if (image) {
            event.preventDefault();
            setImage(null);
        }
    };

    return (
        <>
            <Button onClick={openModal} color="primary" variant="contained">Créer un cours</Button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="modal">
                    <FaTimes className="closeIcon" onClick={closeModal}/>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h4">Créer un cours</Typography>
                        <Box sx={{ mb: 4, mt: 3}}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                {
                                    course.picture ? (
                                        <img
                                            alt="Cours"
                                            src={course.picture}
                                            style={{ width: 140, height: 100, objectFit: "cover"}}
                                        />
                                    ) : null
                                }
                                <input
                                    ref={inputFileRef}
                                    accept="image/*"
                                    hidden
                                    name="picture"
                                    id="image-upload"
                                    type="file"
                                    onChange={handleOnChangeImage}
                                />
                                <label htmlFor="image-upload">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        component="span"
                                        name="profile_picture"
                                        mb={2}
                                        onClick={handleClick}
                                        onChange={handleOnChangeImage}
                                    >
                                        <UploadIcon mr={2} /> &nbsp;Upload
                                    </Button>
                                </label>
                            </Box>

                            <TextField
                                id="title"
                                label="Titre"
                                variant="outlined"
                                name="title"
                                value={course.title}
                                onChange={handleChange}
                                sx={{
                                    width: "100%",
                                    mt: 5
                                }}
                            />
                            <TextField
                                id="filled-multiline-static"
                                label="Description"
                                name="description"
                                multiline
                                rows={4}
                                variant="outlined"
                                value={course.description}
                                onChange={handleChange}
                                sx={{
                                    width: "100%",
                                    mt: 3
                                }}
                            />
                        </Box>
                        <Button type="submit" variant="contained" color="primary">Ajouter</Button>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default CreateCourse