
import React, { useEffect, useState } from 'react'
import { msalInstance, signIn, signOut, getToken } from './services/msal.js'
import { addRowToExcel, getExcelRows } from './services/excel.js'
import EntryForm from './components/EntryForm.jsx'
import EntriesTable from './components/EntriesTable.jsx'

export default function App() {
  const [account, setAccount] = useState(null)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const accounts = msalInstance.getAllAccounts()
    if (accounts.length > 0) setAccount(accounts[0])
  }, [])

  const handleSignIn = async () => {
    try { const acc = await signIn(); setAccount(acc); } catch(e) { setMessage(e.message) }
  }
  const handleSignOut = async () => { await signOut(); setAccount(null) }

  const refresh = async () => {
    setLoading(true)
    setMessage('')
    try {
      const token = await getToken()
      const data = await getExcelRows(token)
      setRows(data)
    } catch (e) {
      setMessage('Refresh failed: ' + e.message)
    } finally { setLoading(false) }
  }

  const onSubmit = async (values) => {
    setLoading(true)
    setMessage('')
    try {
      const token = await getToken()
      await addRowToExcel(token, values)
      setMessage('Entry synced to Excel')
      await refresh()
    } catch (e) {
      setMessage('Sync failed: ' + e.message)
    } finally { setLoading(false) }
  }

  return (
    <>
      <header>
        <img src="/icons/icon-192.png" alt="logo" width="36" height="36" />
        <h1 style={{margin:0}}>Income & Expenditure</h1>
        <div style={{marginLeft:'auto', display:'flex', gap:'.5rem'}}>
          {!account ? (
            <button onClick={handleSignIn}>Sign in</button>
          ) : (
            <>
              <span>Signed in as <strong>{account.username || account.name || account.homeAccountId}</strong></span>
              <button className="secondary" onClick={handleSignOut}>Sign out</button>
            </>
          )}
        </div>
      </header>
      <main>
        <div className="card">
          <EntryForm onSubmit={onSubmit} disabled={!account || loading} />
        </div>
        <div className="card">
          <div style={{display:'flex', alignItems:'center'}}>
            <h2 style={{margin:'0 1rem 0 0'}}>Entries</h2>
            <button onClick={refresh} disabled={!account || loading}>Manual refresh</button>
          </div>
          {message && <p style={{color:'#93c5fd'}}>{message}</p>}
          <EntriesTable rows={rows} />
        </div>
        <p className="footer">PWA with Microsoft Graph Excel sync</p>
      </main>
    </>
  )
}
