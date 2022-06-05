import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = (props) => {
    return (
        <Box component="form" sx={{ margin: "0 auto", display: "flex"}}>
            <TextField
                type="search"
                value={props.searchQuery}
                onChange={(e) => props.setSearchQuery(e.target.value)}
                className="input"
                placeholder="Rechercher"
                name="q"
                sx={{
                    outline: "none",
                    width: "80%"
                }}
                InputProps={{
                    startAdornment: <SearchIcon color="light" sx={{ pr: 1, width: 35, height: 35 }}/>
                }}
            />
            <Button type="submit" color="primary" variant="outlined">Rechercher</Button>
        </Box>
    )
}

export default SearchBar