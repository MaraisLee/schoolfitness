import styled from '@emotion/styled';

interface IModalProps {
  visible: boolean;
  onClose: (e: any) => void;
  children: React.ReactNode;
}

const StampModalLayout = ({ visible, onClose, children }: IModalProps) => {
  const onMaskClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose(e);
      e.stopPropagation();
    }
  };

  return (
    <>
      <ModalWrapper visible={visible} onClick={onMaskClick}>
        <ModalInner>{children}</ModalInner>
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
  background-color: rgba(2, 1, 1, 0.5);
  outline: none;
  z-index: 1000;
  border-radius: 50px;
  cursor: auto;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 90%;
  height: 340px;
  top: 46%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  border-radius: 4px;
`;

export default StampModalLayout;
