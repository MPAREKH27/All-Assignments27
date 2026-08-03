import React, { useState, useEffect, createContext, useContext } from "react";

function PlaylistCard({ song, artist }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{song}</h3>
      <p>{artist}</p>
    </div>
  );
}

