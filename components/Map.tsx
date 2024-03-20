"use client"

import { useCountries } from "@/lib/getCountries"
import { icon } from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, TileLayer } from "react-leaflet"

const ICON = icon({
  iconUrl:
    "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
  iconSize: [50, 50],
})

export const Map = ({ locationValue }: { locationValue: string }) => {
  const { getCountryByValue } = useCountries()
  const latLang = getCountryByValue(locationValue)?.latLang

  return (
    <MapContainer
      className="relative z-0 h-[50vh] rounded-lg"
      center={latLang ?? [52.505, -0.09]}
      scrollWheelZoom={false}
      zoom={6}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={latLang ?? [52.505, -0.09]} icon={ICON} />
    </MapContainer>
  )
}

export default Map
