import React from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Default Leaflet marker fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ✅ Predefined coordinates for India route (Patna → Delhi → Srinagar)
const cityCoordinates = {
  Patna: [25.5941, 85.1376],
  Delhi: [28.6139, 77.2090],
  Srinagar: [34.0837, 74.7973],
};

const TravelMap = () => {
  // Path in order
  const routePath = [
    cityCoordinates.Patna,
    cityCoordinates.Delhi,
    cityCoordinates.Srinagar,
  ];

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg">
<h2 className="text-xl font-bold text-center py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
  India Route Visualization
</h2>


      {/* 🗺️ Map */}
      <MapContainer
        center={[27.5, 80]} // Centered on North India
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "400px", width: "100%" }}
      >
        {/* OpenStreetMap tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Blue line between cities */}
        <Polyline
          positions={routePath}
          color="#3b82f6"
          weight={5}
          opacity={0.9}
        />

        {/* Markers for each city */}
        {Object.entries(cityCoordinates).map(([city, position]) => (
          <Marker key={city} position={position}>
            <Popup>
              <strong>{city}</strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default TravelMap;
