import React, { Fragment } from 'react'

const Messages = ({ connectionInfo }) => (
  <div className="Messages">
    <label>Messages</label>
    <pre>
      <code>
        {connectionInfo.messages.map(message => (<Fragment key={message.id}>{`${message.text}\n`}</Fragment>))}
      </code>
    </pre>
  </div>
)

export default Messages
