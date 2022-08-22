import { useEffect, useRef } from "react";
import message from "./message.module.css";

const Message = (props) => {
  const modalRef = useRef();

  useEffect(() => {
    const clickOutsideContent = (e) => {
      if (e.target === modalRef.current) {
        props.setShow(false);
      }
    };
    window.addEventListener("click", clickOutsideContent);
    return () => {
      window.removeEventListener("click", clickOutsideContent);
    };
  }, [props]);

  return (
    <div
      ref={modalRef}
      className={`${message.modal} ${true ? message.active : ""}`}
    >
      <div className={message.content}>
        {!props.hideCloseButton && (
          <span onClick={() => props.setShow(false)} className={message.close}>
            &times;
          </span>
        )}
        {props.children}
      </div>
    </div>
  );
};

export default Message;

export const ModalHeader = (props) => {
  return <div className={message.header}>Message</div>;
};

export const ModalBody = (props) => {
  return (
    <div className={message.body}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ullam hic
      ratione, voluptates repellendus nobis dolorem pariatur suscipit, non
      blanditiis iure provident soluta harum aperiam praesentium quis cumque
      quaerat iste!
    </div>
  );
};

export const ModalFooter = (props) => {
  return <div className={message.footer}>amine arrouk amine arrouk amomis</div>;
};
