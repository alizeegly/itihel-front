import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import moment from "moment";


const styles = {
    details: {
        padding: "1rem",
        borderTop: "1px solid #e1e1e1",
        height: 80,
        display: "flex",
        alignItems: "center"
    },
    value: {
        padding: "1rem",
        borderTop: "1px solid #e1e1e1",
        color: "#ff558f",
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end"
    }
};

function ProfileCard({user}) {
    console.log(user)
    
    return (
        <Card variant="outlined" sx={{ height: "100%" }}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item sx={{ p: "1.5rem 0rem" }}>
                    <Avatar
                        sx={{ width: 50, height: 50, mb: 15, margin: "0 auto" }}
                    >{user.first_name[0]}{user.last_name[0]}</Avatar>
                    <Typography variant="h5" sx={{ textAlign: "center", mt: 2 }}>{user.pseudo}</Typography>
                    <Typography color="text.secondary" sx={{ textAlign: "center" }}></Typography>
                </Grid>

                <Grid container>
                    <Grid item xs={7}>
                        <Typography style={styles.details}>Membre depuis</Typography>
                        {/* <Typography style={styles.details}>Nombre de cours</Typography> */}
                    </Grid>
                    <Grid item xs={5} sx={{ textAlign: "end" }}>
                        <Typography style={styles.value}>{moment(user.createdAt).format('DD/MM/YYYY')}</Typography>
                        {/* <Typography style={styles.value}>{publicCourses.length}</Typography> */}
                    </Grid>
                </Grid>

                <Grid item style={styles.details} sx={{ width: "100%" }}>
                    <Button
                        color="secondary"
                        variant="outlined"
                        sx={{ width: "99%", p: 1, my: 2 }}
                        href={"/public-courses?q=" + user.pseudo}
                    >
                        Voir les cours
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
}

export default ProfileCard;