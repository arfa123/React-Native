import * as MapAction from '../action/mapAction';
import Polyline from '@mapbox/polyline';

export class MapMiddleware{
    static userLocation = (location) => {
        return (dispatch) => {
            dispatch(MapAction.userLocation(location))
        }
    }
    static getPlaces = (location) => {
        return (dispatch) => {
            fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDlAilc7DBKvftBfZU5RU346tnbWDEAC7Y&location=${location.latitude},${location.longitude}&radius=10000&type=amusement_park|art_gallery|museum|rv_park|zoo`)
            .then((response) => {
                let places = JSON.parse(response._bodyText).results
                dispatch(MapAction.nearPlaces(places))
            })
            .catch((error) => {
                console.log("error:",error)
            })
        }
    }
    static placeSelected = (place) => {
        return (dispatch) => {
            dispatch(MapAction.placeSelected(place))
        }
    }
    static getDirections = (startLoc,destLoc) => {
        return (dispatch) => {
            fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destLoc}&key=AIzaSyDlAilc7DBKvftBfZU5RU346tnbWDEAC7Y`)
            .then((response) => {
                let res = JSON.parse(response._bodyText).routes[0]
                let points = Polyline.decode(res.overview_polyline.points)
                let coords = points.map((point, index) => {
                    return  {
                        latitude : point[0],
                        longitude : point[1]
                    }
                })
                let distance = res.legs[0].distance.text
                let duration = res.legs[0].duration.text
                console.log("here",res)
                dispatch(MapAction.setDirections({coords,distance,duration}))
            })
            .catch((error) => {
                console.log("error:",error)
            })
        }
    }
}