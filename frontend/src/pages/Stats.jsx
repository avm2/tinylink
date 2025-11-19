import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLink } from '../api';

export default function Stats(){
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(()=>{
    (async ()=>{
      try {
        const data = await getLink(code);
        setLink(data);
      } catch (e) {
        setErr('Not found');
      }
    })();
  }, [code]);

  if (err) return <div style={{padding:20}}> {err} </div>;
  if (!link) return <div style={{padding:20}}> Loading... </div>;
  return (
    <div style={{ padding:20 }}>
      <h2>Stats — {link.code}</h2>
      <p>Target: <a href={link.target} target="_blank" rel="noreferrer">{link.target}</a></p>
      <p>Total clicks: {link.clicks}</p>
      <p>Created: {new Date(link.createdAt).toLocaleString()}</p>
      <p>Last clicked: {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : 'Never'}</p>
      <p><a href={`/${link.code}`} target="_blank" rel="noreferrer">Open redirect</a></p>
    </div>
  );
}
