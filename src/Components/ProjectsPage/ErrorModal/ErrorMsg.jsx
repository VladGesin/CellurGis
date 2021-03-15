import React, { useState, useEffect } from 'react';

function ErrorMsg({ headline, body }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (body.length > 0) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [body]);

  return (
    show && (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">{headline}</h4>
        <p className="mb-0">{body}</p>
      </div>
    )
  );
}

export default ErrorMsg;
