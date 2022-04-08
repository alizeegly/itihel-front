import { Alert, Box, Grid, TextField, Button, Typography, Stack, TextareaAutosize } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BrowserView } from 'react-device-detect'
import { Navigate, useParams } from 'react-router-dom'
import Papers from '../../../components/Papers/Papers'
import SidebarCourseComponent from '../../../components/SidebarCourse/SidebarCourse'
import HeaderCourse from '../HeaderCourse'
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../Navbar'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const drawerWidth = 240;

const FlipCardEdit = () => {

    const [course, setCourse] = useState({})
    const [isModified, setIsModified] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const { id } = useParams();
    const [flipcards, setFlipcards] = useState([])

    const getCourse = async () => {
        try {
            const course = await axios.get("/api/courses/find/" + id)
            setCourse(course.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getFlipCards = async () => {
        try {
            const flipcards = await axios.get("/api/flip-cards/courses/" + id)
            setFlipcards(flipcards.data);
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        flipcards.forEach(card => {
            axios.put("/api/flip-cards/" + card._id, card)
            .then((res) => {
                console.log("modifié")
            })
            .catch(err => {
                console.log(err)
            })
        });
        setIsModified(true)
    }

    const handleDelete = (index) => {
        confirmAlert({
            message: 'Êtes-vous sûre de vouloir supprimer cette flip card ?',
            buttons: [
              {
                label: 'Oui',
                onClick: () => {
                    axios.delete("/api/flip-cards/" + flipcards[index]._id)
                        .then((res) => {
                            let newArr = [...flipcards]; 
                            newArr.splice(index, 1)
                            setFlipcards(newArr);
                            setIsDeleted(true)
                            console.log("supprimé")
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
              },
              {
                label: 'Non',
                onClick: () => console.log("non")
              }
            ]
        });

       
    }

    useEffect(()=>{
        getCourse()
        getFlipCards()
    }, [])


    return (
        <Box sx={{ display: 'flex', position: "relative", overflowX: "hidden" }}>
            <SidebarCourseComponent course={course}/>
            <Box
                component="main"
                sx={{ 
                    flexGrow: 1, 
                    width: { sm: `calc(100% - ${drawerWidth}px)` } 
                }}
            >
                <Navbar/>

                <HeaderCourse course={course}/>

                {
                    isModified ? (
                        <Stack sx={{ width: '95%', margin: "0 auto" }} spacing={2}>
                            <Alert icon={<CheckIcon fontSize="inherit" color='#5EB760' />} severity="success" onClose={() => {setIsModified(false)}} sx={{ background: "#EDF7ED", color: "#5EB760", fontWeight: "bold" }}>Les flip cards ont bien étés modifiées</Alert>
                        </Stack>
                    ) : (
                        ""
                    )
                }

                {
                    isDeleted ? (
                        <Stack sx={{ width: '95%', margin: "0 auto" }} spacing={2}>
                            <Alert icon={<DeleteIcon fontSize="inherit" sx={{ color: "#5F2120!important" }} />} severity="success" onClose={() => {setIsDeleted(false)}} sx={{ background: "#FCEDEC", color: "#5F2120", fontWeight: "bold" }}>La flip card a bien été suprimée</Alert>
                        </Stack>
                    ) : (
                        ""
                    )
                }

                <BrowserView>
                    <Papers
                        bg1="#94DDDE"
                        border1="#3D90BD"
                        bg2="#F3CD74"
                        border2="#3D90BD"
                    />
                </BrowserView>


                <Grid
                    container
                    direction="column"
                    spacing={3}
                    sx={{ mb: 2, mt: 3, px: { xs: 0, md: 7 } }}
                >
                    <Typography variant="h1" component="div">MODIFIER LES FLIP CARDS</Typography>

                    <Box component="form" sx={{ margin: "0 auto", width: "60%" }} onSubmit={handleSubmit}>
                        <Stack direction="row" spacing={5} sx={{ mt: 3 }}>
                            <Typography variant="h6" sx={{ width: "90%" }}>Questions</Typography>
                            <Typography variant="h6" sx={{ width: "90%" }}>Réponses</Typography>
                        </Stack>
                        
                        {
                            flipcards.length > 0 && flipcards.map((card, index) => (
                                <Stack direction="row" spacing={5} sx={{ mt: 3, alignItems: "center" }} key={index}>
                                    <textarea  
                                        id="question"
                                        label="Question"
                                        variant="outlined"
                                        name="question"
                                        value={card.question}
                                        onChange={(e) => {
                                            let newArr = [...flipcards]; 
                                            newArr[index]['question'] = e.target.value;
                                            setFlipcards(newArr);
                                        }}
                                        style={{ width: "90%", height: 90, fontFamily: 'Quicksand', padding: "16.5px 14px", fontWeight: "400", borderColor: "rgba(0, 0, 0, 0.23)", borderRadius: "5px" }}
                                    />
                                    <textarea 
                                        id="answer"
                                        label="Réponse"
                                        variant="outlined"
                                        name="answer"
                                        value={card.answer}
                                        onChange={(e) => {
                                            let newArr = [...flipcards];
                                            newArr[index]['answer'] = e.target.value;
                                            setFlipcards(newArr);
                                        }}
                                        style={{ width: "90%", height: 90, fontFamily: 'Quicksand', padding: "16.5px 14px", fontWeight: "400", borderColor: "rgba(0, 0, 0, 0.23)", borderRadius: "5px" }}
                                    />
                                    <DeleteIcon sx={{ cursor: "pointer", ml: "10px!important" }} onClick={() => handleDelete(index)}/>
                                </Stack>
                            ))
                        }
                        <Button type="submit" variant="contained" color="info" sx={{ margin: "0 auto", mt: 5, textAlign: "center" }}>Modifier</Button>
                    </Box>
                </Grid>
            </Box>
        </Box>
    )
}

export default FlipCardEdit