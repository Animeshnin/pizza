import React from 'react';
import './modal.css'
import { IoCloseOutline } from "react-icons/io5";

type ModalProps = {
    active: boolean;
    setActive: (active: boolean) => void;
    children: React.ReactNode;
}

function Modal({active, setActive, children}: ModalProps)  {
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