import {BASE_URL} from "../const/BASE_URL";

export const podcastsAPIs = {
    GET_ALL_PODCASTS: BASE_URL+'podcasts/getAll',  //GET
    GET_PODCAST_BY_ID: BASE_URL+'podcasts/findById/',//GET pass id where call
    ADD_PODCAST: BASE_URL+'podcasts/addPodcast', //POST
    UPDATE_PODCAST: BASE_URL+'podcasts/updatePodcast', //PUT
    DELETE_PODCAST: BASE_URL+'podcasts/deleteById/', //DELETE pass id where call
}