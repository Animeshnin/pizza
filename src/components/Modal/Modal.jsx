import React from 'react';
import './modal.css'
import { IoCloseOutline } from "react-icons/io5";
function Modal({active, setActive, children}) {
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <div className={'modal-close-button'} onClick={() => setActive(false)}><IoCloseOutline /></div>
                {children}
            </div>
        </div>
    );
}

export default Modal;