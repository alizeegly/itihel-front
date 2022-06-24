import React, { useState } from 'react'
import { Alert, AlertTitle, Button, Chip, Grid, IconButton, Link, Tooltip, Typography } from '@mui/material'
import moment from 'moment'
import Modal from 'react-modal'
import ProfileCard from '../Profile/ProfilCard';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 35,
        width: "375px",
        zIndex: 1000
    },
    overlay: {zIndex: 1000}
};

const CourseHeader = ({ course, roles }) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [modalData, setModalData] = useState(null)

    function closeModal() {
        setIsOpen(false)
    }

    return (
        <Grid container spacing={2} columns={12} alignItems="center">
            <Grid item md={3}>
                <Typography>
                    Créé le {moment(course.createdAt).format('DD/MM/YYYY')}
                </Typography>
            </Grid>
            <Grid item md={6}>
                <Alert severity="info">
                    <AlertTitle>
                        Vos rôles sur ce cours :
                    </AlertTitle>
                    <ul>
                        {
                            roles.length > 0 ? 
                                roles.map((role, index) => (
                                    <div key={index}>{role.name}{roles.length-1 != index && ', '}</div>
                                ))
                            : (
                                "Lecture du cours"
                            )
                        }
                    </ul>
                </Alert>
            </Grid>
            <Grid item md={3} display="flex" justifyContent="flex-end" alignItems="center">
                Par &nbsp; 
                <Tooltip title="Voir le profil">
                    <Link 
                        onClick={()=> {
                            setModalData(course);
                            setIsOpen(true);
                        }}
                        underline="hover"
                        sx={{ cursor: "pointer" }}
                    >
                        @{course.owner_id.pseudo}
                    </Link>
                </Tooltip>
                <Chip label={course.is_public ? "Public" : "Privé"} variant="outlined" color={course.is_public ? "success" : "warning"} sx={{ ml: 3 }}/>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <ProfileCard user={modalData && modalData.owner_id ? modalData.owner_id : null}/>
                </Modal>
            </Grid>
        </Grid>
    )
}

export default CourseHeader