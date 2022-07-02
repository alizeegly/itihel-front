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

    const formatResult = (item) => {
        return item
    }

    const onSubmit = (e) => {
        console.log("send")
    }

    const items = [
        {
          id: 0,
          name: 'Cobol'
        },
        {
          id: 1,
          name: 'JavaScript'
        },
        {
          id: 2,
          name: 'Basic'
        },
        {
          id: 3,
          name: 'PHP'
        },
        {
          id: 4,
          name: 'Java'
        }
      ]

    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
    }

    const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item) => {
        // the item selected
        console.log(item)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }
    

    useEffect(()=>{
        if(users.length <= 0){
            getUsers()
        }
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
                                {
                                    users.length > 0 && (
                                        <ReactSearchAutocomplete
                                            items={items}
                                            onSearch={handleOnSearch}
                                            onHover={handleOnHover}
                                            onSelect={handleOnSelect}
                                            onFocus={handleOnFocus}
                                            autoFocus
                                            formatResult={formatResult}
                                        />
                                    )
                                }
                            </>
                        )
                    }
                </Box>
            </Modal>
        </>
    )
}

export default SharedCourse;