// Import React and Google Map React components
import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

// Define a custom marker component
const Marker = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "red",
      padding: "5px",
      borderRadius: "50%",
    }}
  >
    {text}
  </div>
);

// Define a map component
const Map = () => {
  // Initialize the state variables
  const [center, setCenter] = useState({ lat: 0, lng: 0 }); // The center of the map
  const [zoom, setZoom] = useState(11); // The zoom level of the map
  const [markers, setMarkers] = useState([]); // The array of markers to display on the map

  // Define a function to get the current location of the user
  const getCurrentLocation = () => {
    // Check if geolocation is supported
    if (navigator.geolocation) {
      // Request user's permission
      navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
          // Get the coordinates
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          // Set the center of the map to the current location
          setCenter({ lat: latitude, lng: longitude });
          // Add a marker for the current location
          setMarkers([
            ...markers,
            { lat: latitude, lng: longitude, text: "You are here" },
          ]);
        },
        // Error callback
        (error) => {
          // Handle the error
          console.log("Error: " + error.message);
        },
        // Options object
        {
          enableHighAccuracy: true, // Use GPS or other sensors for higher accuracy
          maximumAge: 30000, // Accept a cached position up to 30 seconds old
          timeout: 10000, // Abort if no position is obtained within 10 seconds
        }
      );
    } else {
      // Geolocation is not supported
      console.log("Geolocation is not supported by your browser");
    }
  };

  // Define a function to get the nearby restaurants from the backend server
  const getNearbyRestaurants = async () => {
    try {
      // Send a GET request to the backend API with the current location as query parameters
      const response = await fetch(
        `/api/restaurants?lat=${center.lat}&lng=${center.lng}`
      );
      // Parse the response as JSON
      const data = await response.json();
      // Loop through the data and add markers for each restaurant
      data.forEach((restaurant) => {
        setMarkers([
          ...markers,
          {
            lat: restaurant.location[0],
            lng: restaurant.location[1],
            text: restaurant.name,
          },
        ]);
      });
    } catch (error) {
      // Handle the error
      console.log("Error: " + error.message);
    }
  };

  // Use useEffect hook to run the functions once when the component mounts
  useEffect(() => {
    getCurrentLocation();
    getNearbyRestaurants();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }} // Your Google Maps API key goes here
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers.map((marker, index) => (
          <Marker key={index} lat={marker.lat} lng={marker.lng} text={marker.text} />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
