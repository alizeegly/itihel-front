import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import moment from 'moment';
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "react-use-session";

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

export default function ProfileCard(props) {
    const { session, saveJWT, clear } = useSession('itihel')
    const [user, setUser] = useState({
        courses: [],
        createdAt: "",
        email: "",
        first_name: "",
        last_connection: "",
        last_name: "",
        password: "",
        profile_picture: "",
        pseudo: "",
        updatedAt: "",
        _id: ""
    })

    const getUser = async () => {
        try {
            console.log(session)
            const user = await axios.get("/api/users/find/" + session.user.id)
            setUser(user.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(()=>{
        getUser()
    }, [])

    return (
        <Card variant="outlined">
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item sx={{ p: "1.5rem 0rem" }}>
                    <Avatar
                        sx={{ width: 100, height: 100, mb: 1.5, margin: "0 auto" }}
                        src={user.profile_picture}
                    ></Avatar>
                    <Typography variant="h5" sx={{ textAlign: "center" }}>{user.pseudo}</Typography>
                    <Typography color="text.secondary" sx={{ textAlign: "center" }}></Typography>
                </Grid>

                <Grid container>
                    <Grid item xs={6}>
                        <Typography style={styles.details}>Dernière connexion</Typography>
                        <Typography style={styles.details}>Nombre de cours</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "end" }}>
                        <Typography style={styles.value}>{moment(user.lastconnection).format('DD/MM/YYYY')}</Typography>
                        <Typography style={styles.value}>{user.courses.length}</Typography>
                    </Grid>
                </Grid>

                <Grid item style={styles.details} sx={{ width: "100%" }}>
                    <Button
                        color="secondary"
                        variant="outlined"
                        sx={{ width: "99%", p: 1, my: 2 }}
                    >
                        Voir les cours
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
}
