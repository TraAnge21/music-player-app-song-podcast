import {useParams} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {podcastsAPIs} from "../api/APIs";

export default function UpdatePodcastForm(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [updateStatus, setUpdateStatus] = useState('');
    const {id} = useParams()
    const [music, setMusic] = useState({
        id: id,
        name: '',
        artist: '',
        description: '',
        source: '',
        audio: '',
        image: '',
        title: ''
    })
    const fetchDataWithId = async (id) => {
        await axios.get(podcastsAPIs.GET_PODCAST_BY_ID+id).then(async res => {
            await setMusic(res.data.data[0])
        })
    }
    const handleChange = (e) => {
        e.preventDefault()
        let value = e.target.value
        setMusic({...music, [e.target.name]: value});
    }

    const handleSubmit =async (e) => {
        setIsLoading(true)
        await axios.put(podcastsAPIs.UPDATE_PODCAST, music).then(res=> {
            console.log(res.data)
            setUpdateStatus("Updated");
            setIsLoading(false)
        }).catch(err=> {
            setIsLoading(false)
            setUpdateStatus(err.data.data[0].message)
        })
    }

    useEffect(()=> {
        fetchDataWithId(id)
    }, [])

    return (
        <>
            <div className="mt-sm-10 mt-md-7 mt-lg-7 container background top-0">
                <div className="mt-7 container background position-sticky z-index-sticky top-0">
                    <h6 style={{color: 'green'}}>{updateStatus}</h6>
                    <div className="row">
                        <div className="col-12">
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
            </div>
        </>
    )
}