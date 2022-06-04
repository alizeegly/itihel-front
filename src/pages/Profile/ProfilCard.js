import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { connect } from 'react-redux';
import PropTypes from "prop-types";


const styles = {
  details: {
    padding: "1rem",
    borderTop: "1px solid #e1e1e1",
    height: 80,
    display: "flex",
    alignItems: "center"
  },
  value: {
    padding: "1rem 2rem",
    borderTop: "1px solid #e1e1e1",
    color: "#ff558f",
    height: 80,
    display: "flex",
    alignItems: "center"
  }
};

function ProfileCard({ auth: { user } }) {

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
                    >{user && user.first_name[0]}{user && user.last_name[0]}</Avatar>
                    <Typography variant="h5" sx={{ textAlign: "center", mt: 2 }}>{user && user.pseudo}</Typography>
                    <Typography color="text.secondary" sx={{ textAlign: "center" }}></Typography>
                </Grid>

                <Grid container>
                    <Grid item xs={6}>
                        {/* <Typography style={styles.details}>Dernière connexion</Typography> */}
                        <Typography style={styles.details}>Nombre de cours</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "end" }}>
                        {/* <Typography style={styles.value}>{moment(user.last_connection).format('DD/MM/YYYY')}</Typography> */}
                        <Typography style={styles.value}>{user && user.courses.length}</Typography>
                    </Grid>
                </Grid>

                {/* <Grid item style={styles.details} sx={{ width: "100%" }}>
                    <Button
                        color="secondary"
                        variant="outlined"
                        sx={{ width: "99%", p: 1, my: 2 }}
                        href={"/public-courses?q=" + user && user.pseudo}
                    >
                        Voir les cours
                    </Button>
                </Grid> */}
            </Grid>
        </Card>
    );
}

ProfileCard.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(ProfileCard);