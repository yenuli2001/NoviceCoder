import React from 'react';

const Lobby = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe
        src="/lobby.html"
        style={{ border: 'none', height: '100%', width: '100%' }}
        title="Lobby"
      ></iframe>
    </div>
  );
};

export default Lobby;
