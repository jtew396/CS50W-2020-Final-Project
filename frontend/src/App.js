import React from 'react';
import apiConfig from './apiKeys';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";


const libraries = ["places"];
const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
}
const center = {
    lat: 35.13727,
    lng: -89.96263,
}
const options = {
    disableDefaultUI: true,
    zoomControl: true
}


export default function App() {
    // const [error, setError] = React.useState(null);
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: apiConfig.googleKey,
        libraries,
    });
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const onMapClick = React.useCallback((event) => {
        fetch('http://localhost:8000/skatespots/spots/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            })
        })
        setMarkers(current => [
            ...current,
            {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    }, []);

    React.useEffect(() => {
        fetch('http://localhost:8000/skatespots/spots/')
        .then(res => res.json())
        .then(
            (result) => {
                setMarkers(result.map(i => {
                    return { lat: i.lat, lng: i.lng, time: new Date(i.created_at) }
                }));
            },
            (error) => {

            }
        )
    }, []);

    if (loadError) return "Error loading maps";
    if(!isLoaded) return "Loading Maps";

    return (
        <div className="App">
            <h1>
                Skate Spots <span role="img" aria-label="skateboard">🛹</span>
            </h1>

            <Search panTo={panTo} />
            <Locate panTo={panTo} />

            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.time.toISOString()}
                        position={{lat: marker.lat, lng: marker.lng}}
                        onClick={() => {
                            setSelected(marker);
                        }}
                    />
                ))}

                {selected ? (
                    <InfoWindow
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div>
                            <h5>Skate spot!</h5>
                            <p>Discovered {formatRelative(selected.time, new Date())}</p>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    );
}

function Locate({panTo}) {
    return (
        <button
            className="locate"
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    () => null,
                );
            }}
        >
            <img src="compass.svg" alt="compass - locate me" />
        </button>
    );
}

function Search({ panTo }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 35.13727, lng: () => -89.96263 },
            radius: 200000
        },
    });

    return (
        <div className="search">
            <Combobox
                onSelect={async (address) => {
                    setValue(address, false);
                    clearSuggestions();

                    try {
                        const results = await getGeocode({ address });
                        const { lat , lng } = await getLatLng(results[0]);
                        panTo({ lat, lng });
                    } catch(error) {
                        console.log("error!");
                    }
                }}
            >
                <ComboboxInput
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    disabled={!ready}
                    placeholder="Enter an address"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}
