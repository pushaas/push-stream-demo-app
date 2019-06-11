import React, { Fragment } from 'react'

const Logs = ({ connectionInfo }) => {
  return (
    <div className="Logs">
      <span>Logs</span>
      <pre>
        <code>
          {connectionInfo.logs.map(log => (<Fragment key={log.id}>{`${log.text}\n`}</Fragment>))}
        </code>
      </pre>
    </div>
  )
}

export default Logs
