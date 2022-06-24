import { Box, Button, FormControlLabel, Grid, Stack, Switch, TextField } from '@mui/material'
import React from 'react'

const Parameters = (props) => {


    return (
        <>
            <Grid item sm={12}>
                <h1>Paramètres</h1>
            </Grid>
            <Grid item sm={12} md={6}>
                <Box component="form">
                    <Grid item sm={12}>
                        <TextField
                            margin="normal"
                            fullWidth
                            name="title"
                            label="Titre"
                            type="text"
                            id="title"
                            multiline
                            autoComplete="current-password"
                            // value={course.title}
                            // onChange={(e) => onChange(e)}
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            margin="normal"
                            fullWidth
                            name="description"
                            label="Description"
                            type="description"
                            id="description"
                            multiline
                            // value={course.description}
                            // onChange={(e) => onChange(e)}
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <FormControlLabel 
                            control={
                                <Switch
                                    // checked={checked}
                                    // onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            } 
                            label="Mettre le cours en public" 
                            labelPlacement="start"
                            sx={{ ml: 0 }}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="info"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Modifier
                    </Button>
                </Box>
            </Grid>
            <Grid item sm={12} md={6}>
                Hello
            </Grid>
        </>
    )
}

export default Parameters