
import React, { useState } from 'react'

const initial = {
  Type: 'Income',
  Company: '',
  EntryDate: new Date().toISOString().slice(0,10),
  Hours: '',
  Rate: '',
  Income: '',
  Travelling: '',
  Rent: '',
  Mobile: '',
  Shopping: '',
  Credit: '',
  Other: '',
  Currency: 'GBP'
}

export default function EntryForm({ onSubmit, disabled }) {
  const [form, setForm] = useState(initial)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    onSubmit(form)
    setForm(initial)
  }

  const input = (label, key, type='text') => (
    <label>
      {label}
      <input value={form[key]} onChange={set(key)} type={type} required={key==='Company' || key==='EntryDate'} />
    </label>
  )

  return (
    <form onSubmit={submit}>
      <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'1rem'}}>
        <label>
          Type
          <select value={form.Type} onChange={set('Type')}>
            <option>Income</option>
            <option>Expenditure</option>
          </select>
        </label>
        {input('Company','Company')}
        {input('EntryDate','EntryDate','date')}
        {input('Hours','Hours','number')}
        {input('Rate','Rate','number')}
        {input('Income','Income','number')}
        {input('Travelling','Travelling','number')}
        {input('Rent','Rent','number')}
        {input('Mobile','Mobile','number')}
        {input('Shopping','Shopping','number')}
        {input('Credit','Credit','number')}
        {input('Other','Other','number')}
        <label>
          Currency
          <select value={form.Currency} onChange={set('Currency')}>
            <option>GBP</option>
            <option>USD</option>
            <option>EUR</option>
            <option>INR</option>
          </select>
        </label>
      </div>
      <div style={{marginTop:'1rem'}}>
        <button disabled={disabled}>Submit</button>
      </div>
    </form>
  )
}
