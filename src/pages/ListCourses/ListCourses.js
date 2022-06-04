import React, { useState } from 'react'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import LayoutSidebar from '../../layouts/LayoutSidebar'
import SearchIcon from '@mui/icons-material/Search';
import Highlighter from 'react-highlight-words'
import Modal from 'react-modal'
import Alert from '../../components/layout/Alert';
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
        width: "350px",
        zIndex: 1000
    },
    overlay: {zIndex: 1000}
};

const ListCourses = ({ list }) => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('q');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const [modalIsOpen, setIsOpen] = useState(false)
    const [modalData, setModalData] = useState(null)

    function closeModal() {
        setIsOpen(false)
    }

    const filterPosts = (posts, query) => {
        if (!query) {
            return posts;
        }
    
        return posts.filter((post) => {
            const postName = post.title.toLowerCase()
            const description = post.description.toLowerCase()
            const pseudo = post.owner_id && post.owner_id.pseudo ? post.owner_id.pseudo.toLowerCase() : ""
            return postName.includes(query) || description.includes(query) || pseudo.includes(query)
        });
    };

    const filteredPosts = filterPosts(list, query)

    console.log(filteredPosts)

    return (
        <LayoutSidebar>
            <Alert/>
            <Box component="form" sx={{ width: "50%", margin: "0 auto", display: "flex", justifyContent: "space-between"}}>
                <TextField
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input"
                    placeholder="Rechercher"
                    name="q"
                    sx={{
                        outline: "none",
                        pl: 1,
                        width: "80%"
                    }}
                    InputProps={{
                        startAdornment: <SearchIcon color="light" sx={{ pr: 1, width: 35, height: 35 }}/>
                    }}
                />
                <Button type="submit" color="primary" variant="outlined">Rechercher</Button>
            </Box>
            <Grid
                container
                columns={12}
                spacing={3}
                sx={{ 
                    mb: 5, 
                    px: { xs: 0, md: 7 },
                    mt: 3
                }}
            >
                {filteredPosts && filteredPosts.length > 0 && filteredPosts.map((course, index) => (
                    <Grid item xs={12} md={4} key={index} height="400px">
                        <Card sx={{ position: "relative", height: "100%" }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={"https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"}
                                alt={"course.title"}
                            />
                            <CardContent sx={{mb: 7}}>
                                <Typography gutterBottom variant="h5" component="div">
                                    <Highlighter
                                        highlightStyle={{background: "yellow"}}
                                        searchWords={[searchQuery]}
                                        autoEscape={true}
                                        textToHighlight={course.title}
                                    />
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <Highlighter
                                        highlightStyle={{background: "yellow"}}
                                        searchWords={[searchQuery]}
                                        autoEscape={true}
                                        textToHighlight={course.description.length > 100 ? course.description.substr(0, 100)+"..." : course.description}
                                    />
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ position: "absolute", bottom: 0, left: 0, display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <Tooltip title="Voir le profil">
                                    <IconButton onClick={()=> {
                                        setModalData(course);
                                        setIsOpen(true);
                                    }}>
                                        <Avatar>
                                            {course && course.owner_id && course.owner_id.first_name[0]+course.owner_id.last_name[0]}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Button
                                    size="small" 
                                    href={"/courses/" + course._id}
                                >Voir le cours</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <ProfileCard user={modalData && modalData.owner_id ? modalData.owner_id : null}/>
            </Modal>
        </LayoutSidebar>
    )
}

export default ListCourses