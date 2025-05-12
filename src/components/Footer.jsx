import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaLocationCrosshairs } from 'react-icons/fa6';
import { Spinner } from 'reactstrap';

function Footer() {
  const [ip, setIp] = useState(null); //State to hold the IP address
  const [country, setCountry] = useState(null); //State to hold geolocation
  const [region, setRegion] = useState(null); // State to hold geolocation

  const getGeoLocationData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_LOCATION_API_KEY}`)
      setIp(response.data.ip)
      setCountry(response.data.location.country)
      setRegion(response.data.location.region)
    } catch(error) {
      console.error("Error fetching geolocation data:", error.message)
    }
  }

  useEffect(() => {
    getGeoLocationData()
  }, [])

  return (
    <footer>
      {
        ip ?
        <h6><FaLocationCrosshairs style={{marginBottom: "0.1rem"}} /> {ip} | {country}, {region}</h6> :
        <><Spinner size="sm" /> Loading...</>
      }
    </footer>
  )
}

export default Footer