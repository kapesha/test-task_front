import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import classNames from 'classnames';
import ReactDOM from "react-dom";
type Props = {
  children: ReactNode;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const ModalWindow: React.FC<Props> = ({ children, openModal, setOpenModal }) => {
  return ReactDOM.createPortal(
    <div className={classNames('modal', {
      isActive: openModal,
    })}>
      <div className='modal__content'>
        {children}

      </div>
      <div className='modal__background' onClick={() => setOpenModal(false)} />
    </div>,
    document.body
  )
}