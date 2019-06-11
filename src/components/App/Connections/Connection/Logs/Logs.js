import React, { Fragment } from 'react'

const Logs = ({ connectionInfo }) => {
  return (
    <div className="Logs">
      <label>Logs</label>
      <pre>
        <code>
          {connectionInfo.logs.map(log => (<Fragment key={log.id}>{`${log.text}\n`}</Fragment>))}
        </code>
      </pre>
    </div>
  )
}

export default Logs
