import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { Box, Button, Fab, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import Alert from '../../components/Alert/Alert';
import { setAlert } from "../../redux/actions/alertActions";
import { addCourse } from '../../redux/actions/courseActions';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

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


const SharedCourse = ({ courseShared = {} }) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [users, setUsers] = useState([])

    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    const getUsers = async () => {
        try {
            const users = await axios.get("http://localhost:8800/api/users/")
            setUsers(users.data);
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleOnSelect = (item) => {
        console.log(item)
    }

    const formatResult = (item) => {
        return item
    }

    const onSubmit = (e) => {
        console.log("send")
    }

    useEffect(()=>{
        // if(users.length <= 0){
        //     getUsers()
        // }
    }, [])

    return (
        <>
            {
                courseShared && courseShared._id ? (
                    <Tooltip title={"Modifier les rôles de " + courseShared.user_id.pseudo}>
                        <IconButton onClick={openModal}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Ajouter un utilisateur au cours">
                        <IconButton onClick={openModal}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                )
            }
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Box component="form" onSubmit={(e) => onSubmit(e)} noValidate>
                    <Typography variant="h4">Partager le cours</Typography>
                    <Alert/>

                    {
                        courseShared && courseShared._id ? (
                            <Typography>{courseShared.user_id.pseudo}</Typography>
                        ) : (
                            <>
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
                            </>
                        )
                    }
                </Box>
            </Modal>
        </>
    )
}

export default SharedCourse;