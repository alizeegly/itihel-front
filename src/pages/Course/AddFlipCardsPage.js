import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Navbar } from '../../components';
import LayoutSidebar from '../../layouts/LayoutSidebar';

const AddFlipCardsPage = (props) => {
  const { id } = props.match.params
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [course, setCourse] = useState({})
  const [cards, setCards] = useState([])
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("/api/flip-cards/create", {question, answer: response, course_id: id})
      .then((res) => {
          console.log("ajouté")
      })
      .catch(err => {
          console.log(err)
      })
  }

  return (
    <LayoutSidebar img={false} appbar={<Navbar color="white"/>} title={course && course.title} course={course && course}>
      <h1>AJOUTER UNE FLIP CARDS</h1>
      <Box component="form" sx={{ margin: "0 auto", width: "60%" }} onSubmit={handleSubmit}>
        <TextField
            margin="normal"
            required
            fullWidth
            name="question"
            label="Question"
            type="text"
            id="question"
            multiline
            autoComplete="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            name="response"
            label="Réponse"
            type="response"
            id="response"
            multiline
            value={response}
            onChange={(e) => setResponse(e.target.value)}
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
    </LayoutSidebar>
  )
}

export default AddFlipCardsPage