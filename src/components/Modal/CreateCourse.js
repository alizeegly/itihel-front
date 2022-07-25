import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { Box, Button, Fab, TextField, Tooltip, Typography } from '@mui/material'
import Alert from '../../components/Alert/Alert';
import { setAlert } from "../../redux/actions/alertActions";
import { addCourse } from '../../redux/actions/courseActions';
import { connect, useDispatch, useSelector } from 'react-redux';
import AddIcon from "@mui/icons-material/Add";
import { createCourseAction } from '../../redux/actions/listActions';

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


const CreateCourse = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const courseCreate = useSelector((state) => state.courseCreate);
  
    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    const resetHandler = () => {
        setTitle("");
        setDescription("");
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createCourseAction({
                title,
                text: "",
                isPublic: false,
                owner_id: userInfo._id,
                profile_picture: "",
                categories: [],
                description
            })
        )
        if (!title || !description) return
    
        resetHandler()
        setIsOpen(false)
    };

    useEffect(() => {}, []);

    return (
        <>
            <Tooltip title="Créer un cours">
                <Fab
                    sx={{
                        position: "fixed",
                        bottom: (theme) => theme.spacing(4),
                        right: (theme) => theme.spacing(4)
                    }}
                    color="primary"
                    onClick={openModal}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Box component="form" onSubmit={submitHandler} noValidate>
                    <Typography variant="h4">Créer un cours</Typography>
                    <Alert/>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="title"
                        label="Titre"
                        type="text"
                        id="title"
                        multiline
                        autoComplete="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="description"
                        label="Description"
                        type="description"
                        id="description"
                        multiline
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="info"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Ajouter
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

const mapStateToProps  = (state) => {
    return ({
        auth: state.auth
    })
}
  
export default connect(mapStateToProps, { setAlert, addCourse })(CreateCourse);