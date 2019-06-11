import React, { Fragment } from 'react'

const Logs = ({ connectionInfo }) => {
  return (
    <div className="Logs">
      <h3>Logs</h3>
      <pre>
        {connectionInfo.logs.map(log => (<Fragment key={log.id}>{`${log.text}\n`}</Fragment>))}
      </pre>
    </div>
  )
}

export default Logs
