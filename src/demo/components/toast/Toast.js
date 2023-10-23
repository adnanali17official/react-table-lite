import React from 'react'

import './toast.css';

export default function Toast({ text }) {
  return (
	<div id="snackbar">{text}</div>
  )
}
