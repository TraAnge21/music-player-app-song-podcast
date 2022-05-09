import {useEffect, useState} from "react";
import axios from "axios";
import {podcastsAPIs} from "../api/APIs";
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Link} from "react-router-dom";

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


export default function Home() {
    const [expanded, setExpanded] = useState(false);
    const [error, setError] = useState(null);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [podcasts, setPodcasts] = useState([])
    const fetchAllPodcasts = async () => {
        await axios.get(podcastsAPIs.GET_ALL_PODCASTS).then(res => {
            setPodcasts(res.data.data)
        }).catch(err => {
            setError(err.message)
        })
    }
    const deleteMusic = async (id) => {
        await axios.delete(podcastsAPIs.DELETE_PODCAST + id).then(res => {
            console.log('Deleted')
            fetchAllPodcasts()
        }).catch(err => {
            setError(err.message)
        })

    }

    useEffect(() => {
        fetchAllPodcasts()
    }, [])
    return (<>
        <div className="mt-sm-10 mt-md-7 mt-lg-7 container background top-0">
            <div className="row">
                <div className="row">
                    <div className="col-lg-8 col-sm-6 col-md-6"><h4>All Podcasts are Listed Below</h4></div>
                    <div className="col-lg-4 col-sm-6 col-md-6"><button onClick={handleExpandClick} className="btn btn-dark text-white text-center btn-sm">Open With Details</button></div>
                </div>
                {
                    error != null ? <h1 style={{color: 'red'}}>{error}</h1> :
                        podcasts.map(podcast => {
                            return <div key={podcast.id} className="col-lg-4 col-sm-12 col-md-6">
                                <main>
                                    <div className="ms-4 mt-7">
                                        <div className="container ms-20">
                                            <Card sx={{maxWidth: 340}}>
                                                <CardMedia className={"bg-gradient-light shadow"}
                                                           component="img"
                                                           height="180"
                                                           image={podcast.image}
                                                           alt="No Image"/>
                                                <CardContent>
                                                    <Typography variant="h6" color="text.secondary">
                                                        <b>{podcast.name}(Name)</b><br/>
                                                        <i> By {podcast.artist}(Artist)</i>
                                                    </Typography>
                                                    <audio controls>
                                                        <source src={podcast.audio} type="audio/ogg"/>
                                                    </audio>
                                                </CardContent>
                                                <CardActions disableSpacing>
                                                    {/*delete*/}
                                                    <DeleteIcon
                                                        className={"ms-3"}
                                                        style={{cursor: 'pointer', color: 'red'}}
                                                        onClick={() => deleteMusic(podcast.id)}
                                                        aria-label="delete"
                                                    />
                                                    {/*EditIcon*/}
                                                    <Link to={`update/${podcast.id}`}>
                                                        <EditIcon
                                                            className={"ms-3"}
                                                            style={{cursor: 'pointer'}}
                                                            aria-label="edit"
                                                        />
                                                    </Link>
                                                </CardActions>
                                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                                    <CardContent>
                                                        <Typography paragraph><b>Title: </b>{podcast.title}
                                                        </Typography>
                                                        <Typography paragraph>
                                                            <b>Description: </b> {podcast.description}
                                                        </Typography>
                                                        <Typography paragraph> <b>Source: </b> {podcast.source}
                                                        </Typography>
                                                    </CardContent>
                                                </Collapse>
                                            </Card>
                                        </div>
                                    </div>
                                </main>
                            </div>
                        })
                }
            </div>
        </div>
    </>)
}