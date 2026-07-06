import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { escapeRoomAddress } from '../../const';
import { useEffect } from 'react';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const ActiveIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type MapPlace = {
  id: string;
  location: {
    coords: number[];
    address: string;
  };
  slots?: {
    today: [
      {
        time: string;
        isAvailable: boolean;
      },
    ];
    tomorrow: [
      {
        time: string;
        isAvailable: boolean;
      },
    ];
  };
};

type MapProps = {
  viewMode: string;
  places?: MapPlace[];
  selectedPlaceId?: string;
  onPlaceSelect?: (placeId: string) => void;
  cords?: number[] | null;
};

function MapCenter({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 10);
  }, [coords, map]);
  return null;
}

function Map({ viewMode, places, selectedPlaceId, onPlaceSelect, cords }: MapProps): JSX.Element {
  let center: [number, number];

  if (places && places.length > 0) {
    const selectedPlace = places.find((place) => place.id === selectedPlaceId);
    if (selectedPlace?.location.coords && selectedPlace.location.coords.length === 2) {
      center = [selectedPlace.location.coords[0], selectedPlace.location.coords[1]];
    } else if (places[0].location.coords.length === 2) {
      center = [places[0].location.coords[0], places[0].location.coords[1]];
    } else {
      center = escapeRoomAddress;
    }
  } else if (cords && cords.length === 2) {
    center = [cords[0], cords[1]];
  } else {
    center = escapeRoomAddress;
  }

  const zoom = 16;

  return (
    <div className="map">
      <div className="map__container">
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: viewMode, width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {places && places.length > 0 ? (
            <>
              <MapCenter coords={center} />
              {places.map((place) => {
                const isSelected = place.id === selectedPlaceId;
                const position: [number, number] = [place.location.coords[0], place.location.coords[1]];

                return (
                  <Marker
                    key={place.id}
                    position={position}
                    icon={isSelected ? ActiveIcon : DefaultIcon}
                    eventHandlers={{
                      click: () => onPlaceSelect && onPlaceSelect(place.id),
                    }}
                  >
                    <Popup>{place.location.address}</Popup>
                  </Marker>
                );
              })}
            </>
          ) : (
            <Marker position={center}>
              <Popup>escape-room.ru</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
