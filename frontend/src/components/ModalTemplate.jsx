import React, { useEffect, useState } from 'react';

import './ModalTemplate.css';

function Modal({hidden, close, onSuccess, Content, successMessage, title}) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(1);
  }, []);

  function fadeOut() {
    setOpacity(0);
  };

  return (
    <div className='modal' hidden={hidden} onClick={close}>
      <div 
        className='modal-body' 
        style={{ opacity }} 
        onClick={e => e.stopPropagation()}
        onKeyUp={e => {
          if(e.key === 'Enter') onSuccess()
        }}
        >
        <span className='close' onClick={() => {
          fadeOut();
          setTimeout(() => {
            close()
          }, 100)
        }}>X</span>
        <p className='modal-title'>{title}</p>
        {Content}
        <footer>
          <button className='modal-cancel' onMouseUp={close}>Cancel</button>
          <button className='modal-success' onClick={onSuccess}>{successMessage}</button>
        </footer>
      </div>
    </div>
  )
}

export default Modal