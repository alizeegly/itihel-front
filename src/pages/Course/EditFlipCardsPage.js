import { Box, Button, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Navbar } from '../../components'
import LayoutSidebar from '../../layouts/LayoutSidebar'
import Error404Page from '../Errors/Error404Page'
import { ShowForPermission } from './CoursePermissions'
import DeleteIcon from '@mui/icons-material/Delete';
import { confirmAlert } from 'react-confirm-alert'; 

const EditFlipCardsPage = (props) => {
    const { id } = props.match.params
  
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  
    const [course, setCourse] = useState({})
    const [cards, setCards] = useState([])
    const [isModified, setIsModified] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const getCourse = async (id) => {
        const res = await axios.get(process.env.LINK_API + "/api/courses/find/" + id)
        setCourse(res.data)
    }
    
    const getCards = async (course) => {
        const res = await axios.get(process.env.LINK_API + "/api/flip-cards/courses/" + course)
        setCards(res.data)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        cards.forEach(card => {
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
                    axios.delete("/api/flip-cards/" + cards[index]._id)
                        .then((res) => {
                            let newArr = [...cards]; 
                            newArr.splice(index, 1)
                            setCards(newArr);
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

    useEffect(() => {
        if(course && !course._id) getCourse(id)
    
        if(course && course._id && cards && cards.length <= 0) getCards(course._id)
    
        if (!userInfo) {
          return <Redirect to="/login" />;
        }
      }, [getCourse, userInfo, getCards]);

    return (
        <LayoutSidebar img={false} appbar={<Navbar color="white"/>} title={course && course.title} course={course && course}>
            <h1>MODIFIER LES FLIP CARDS</h1>
            <Box component="form" sx={{ margin: "0 auto", width: "60%" }} onSubmit={handleSubmit}>
                <Stack direction="row" spacing={5} sx={{ mt: 3 }}>
                    <Typography variant="h6" sx={{ width: "90%" }}>Questions</Typography>
                    <Typography variant="h6" sx={{ width: "90%" }}>Réponses</Typography>
                </Stack>
                
                {
                    cards.length > 0 && cards.map((card, index) => (
                        <Stack direction="row" spacing={5} sx={{ mt: 3, alignItems: "center" }} key={index}>
                            <textarea  
                                id="question"
                                label="Question"
                                variant="outlined"
                                name="question"
                                value={card.question}
                                onChange={(e) => {
                                    let newArr = [...cards]; 
                                    newArr[index]['question'] = e.target.value;
                                    setCards(newArr);
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
                                    let newArr = [...cards];
                                    newArr[index]['answer'] = e.target.value;
                                    setCards(newArr);
                                }}
                                style={{ width: "90%", height: 90, fontFamily: 'Quicksand', padding: "16.5px 14px", fontWeight: "400", borderColor: "rgba(0, 0, 0, 0.23)", borderRadius: "5px" }}
                            />
                            <DeleteIcon sx={{ cursor: "pointer", ml: "10px!important" }} onClick={() => handleDelete(index)}/>
                        </Stack>
                    ))
                }
                <Button type="submit" variant="contained" color="info" sx={{ margin: "0 auto", mt: 5, textAlign: "center" }}>Modifier</Button>
            </Box>
        </LayoutSidebar>
    )
}

export default EditFlipCardsPage