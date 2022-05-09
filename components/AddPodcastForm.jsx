import {CircularProgress} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {podcastsAPIs} from "../api/APIs";

export default function AddPodcastForm(){
    const [isLoading, setIsLoading] = useState(false);
    const [addStatus, setAddStatus] = useState(null);
    const [music, setMusic] = useState({
        name: '',
        artist: '',
        description: '',
        source: '',
        audio: '',
        image: '',
        title: ''
    })
    const handleChange = (e) => {
        e.preventDefault()
        let value = e.target.value
        setMusic({...music, [e.target.name]: value});
    }
    const handleSubmit =async (e) => {
        setIsLoading(true)
        await axios.post(podcastsAPIs.ADD_PODCAST, music).then(res=> {
            console.log(res.data)
            setAddStatus("Added to Database");
            setMusic({
                name: '',
                artist: '',
                description: '',
                source: '',
                audio: '',
                image: '',
                title: ''
            })
            setIsLoading(false)
        }).catch(err=> {
            setIsLoading(false)
            setAddStatus(err.data.data[0].message)
        })
    }
    return (
        <>
            <div className="mt-sm-10 mt-md-7 mt-lg-7 container background top-0">
                <div className="row">
                    <div className="col-12">
                        {
                            addStatus!==null? <h1>{addStatus}</h1>: ''
                        }
                        <form className={"container"}>
                            <div className="row">
                                <div className="col-md-12 col-lg-6 col-sm-12">
                                    <div className="mb-3">
                                        <input
                                            value={music.artist}
                                            onChange={(e)=> handleChange(e)}
                                            name={"artist"} type="text"
                                            className="form-control"
                                            placeholder="Artist Name"
                                            aria-label="Artist"
                                            aria-describedby="artist-adon"/>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            name={"name"} type="text"
                                            value={music.name}
                                            onChange={(e)=> handleChange(e)}
                                            className="form-control"
                                            placeholder="Music Name"
                                            aria-label="MusicName"
                                            aria-describedby="Music-adon"/>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            name={"audio"} type="text"
                                            value={music.audio}
                                            onChange={(e)=> handleChange(e)}
                                            className="form-control"
                                            placeholder="Audio URL"
                                            aria-label="Audio"
                                            aria-describedby="Music-adon"/>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-6 col-sm-12">
                                    <div className="mb-3">
                                        <input
                                            name={"title"} type="text"
                                            onChange={(e)=> handleChange(e)}
                                            value={music.title}
                                            className="form-control"
                                            placeholder="Music Title"
                                            aria-label="Music Title"
                                            aria-describedby="Music-Title--adon"/>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            name={"image"} type="text"
                                            onChange={(e)=> handleChange(e)}
                                            value={music.image}
                                            className="form-control"
                                            placeholder="Image URL"
                                            aria-label="Image URL"
                                            aria-describedby="Image URL--adon"/>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            name={"source"} type="text"
                                            value={music.source}
                                            onChange={(e)=> handleChange(e)}
                                            className="form-control"
                                            placeholder="Source"
                                            aria-label="Source"
                                            aria-describedby="Source--adon"/>
                                    </div>
                                </div>
                                <textarea
                                    name={"description"}
                                    value={music.description}
                                    onChange={(e)=> handleChange(e)}
                                    style={{height: '100px'}}
                                    className="form-control mb-4"
                                    placeholder="Description"
                                    aria-label="Description" aria-describedby="description-adon"/>
                            </div>
                            <span onClick={handleSubmit} className="btn btn-sm btn-round mb-0 me-1 bg-gradient-dark">
                                {isLoading ? <CircularProgress/> : <b>Submit</b>}</span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}