import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

interface IModalProps {
  visible: boolean;
  onClose?: (e: any) => void;
  children: React.ReactNode;
  top?: number;
  onSubmit?: (e: any) => void;
}

const ModalLayout = ({ visible, onClose, children, top }: IModalProps) => {
  // useEffect(() => {
  //   document.body.style.cssText = `
  //   position: fixed;
  //   top: -${window.scrollY}px;
  //   overflow-y: scroll;
  //   width: 100%;`;
  //   return () => {
  //     const scrollY = document.body.style.top;
  //     document.body.style.cssText = '';
  //     window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  //   };
  // }, []);

  const onMaskClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose(e);
      e.stopPropagation();
    }
  };

  return (
    <>
      <ModalWrapper visible={visible} onClick={onMaskClick}>
        <ModalInner top={top}>{children}</ModalInner>
      </ModalWrapper>
    </>
  );
};

const ModalWrapper = styled.div<{ visible: boolean }>`
  box-sizing: border-box;
  position: absolute;
  display: ${props => (props.visible ? 'block' : 'none')};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  outline: none;
  z-index: 1000;
  border-radius: 50px;
  cursor: auto;
`;

const ModalInner = styled.div<{ top: number | undefined }>`
  box-sizing: border-box;
  position: absolute;
  width: 85%;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.3);
  background-color: #fff;
  top: ${props => (props.top ? props.top + '%' : '50%')};
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  border-radius: 4px;
`;

export default ModalLayout;
