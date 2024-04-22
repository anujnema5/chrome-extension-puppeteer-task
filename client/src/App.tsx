import React, { useContext, useEffect, useState } from 'react'
import { TSocketContext, useSocket } from './Providers/SocketProviders';

const App = () => {
  const [input, setInput] = useState('');
  const { handleSearchVideo, title, loading } = useSocket() as TSocketContext;

  const handleSearch = () => {
    if (!input) return;
    handleSearchVideo(input)
    setInput('')
  }

  return (
    <div style={{ padding: '10px' }}>
      <input type="text" name="" id="" disabled={loading} placeholder='Search youtube video' value={input} onChange={(e) => setInput(e.target.value)} />
      <button disabled={loading} onClick={handleSearch}>{loading ? "Loading" : "Submit"}</button>

        {title && title?.map((title: any) => (
          <p key={title}>{title.title}</p>
        ))}
    </div>
  )
}

export default App