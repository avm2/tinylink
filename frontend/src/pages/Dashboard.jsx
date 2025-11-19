import React, { useEffect, useState } from 'react';
import { listLinks, createLink, deleteLink } from '../api';
import AddLinkForm from '../components/AddLinkForm';
import LinkTable from '../components/LinkTable';

export default function Dashboard(){
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await listLinks();
      setLinks(data);
    } catch (e) {
      setError('Failed to load');
    } finally { setLoading(false); }
  };

  useEffect(()=>{ load(); }, []);

  const onAdd = async (payload) => {
    try {
      await createLink(payload);
      await load();
      return { ok: true };
    } catch (err) {
      if (err.status === 409) return { ok:false, message: 'Code already exists' };
      return { ok:false, message: err.body?.error || 'Error' };
    }
  };

  const onDelete = async (code) => {
    if (!confirm(`Delete ${code}?`)) return;
    try {
      await deleteLink(code);
      setLinks(l => l.filter(x => x.code !== code));
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 1000, margin: '0 auto' }}>
      <h1>TinyLink — Dashboard</h1>
      <AddLinkForm onAdd={onAdd} />
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <LinkTable links={links} onDelete={onDelete} />}
    </div>
  );
}
