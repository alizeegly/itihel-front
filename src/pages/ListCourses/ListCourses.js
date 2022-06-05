import React, { useState } from 'react'
import { Grid } from '@mui/material'
import LayoutSidebar from '../../layouts/LayoutSidebar'
import Modal from 'react-modal'
import ProfileCard from '../Profile/ProfilCard';
import CreateCourse from '../../components/Modal/CreateCourse';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CourseCard from '../../components/Courses/CourseCard';
import SearchBar from '../../components/Courses/SearchBar';

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

const ListCourses = ({ list, course: {course} }) => {
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
            const postName = post.title ? post.title.toLowerCase() : ""
            const description = post.description ? post.description.toLowerCase() : ""
            const pseudo = post.owner_id && post.owner_id.pseudo ? post.owner_id.pseudo.toLowerCase() : ""
            return postName.includes(query) || description.includes(query) || pseudo.includes(query)
        });
    };

    const filteredPosts = filterPosts(list.courses, query)

    if (course && course._id) {
		return <Redirect to={"/courses/" + course._id} />;
	}

    return (
        <LayoutSidebar>
            <Grid 
                container 
                columns={12} 
                sx={{ 
                    px: { xs: 0, md: 7 }
                }}
                direction={{xs: "column", md: "row"}}
                alignItems="center"
                justifyContent="center"
            >
                <Grid item md={7}>
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </Grid>
            </Grid>
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
                {filteredPosts && filteredPosts.length > 0 && filteredPosts.map((filterCourse, index) => (
                    <Grid item xs={12} md={4} height="450px">
                        <CourseCard key={index} course={filterCourse} setModalData={setModalData} setIsOpen={setIsOpen} searchQuery={searchQuery} />
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
            <CreateCourse/>
        </LayoutSidebar>
    )
}

const mapStateToProps  = (state) => {
    return ({
        course: state.course,
    })
}

export default connect(mapStateToProps)(ListCourses);