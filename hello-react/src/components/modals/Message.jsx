/** @format */

import { useImperativeHandle, useRef, useState } from "react";
import Portal from "./Portal";

export default function Message({ messageRef }) {
  const [message, setMessage] = useState();
  const modalRef = useRef();

  // ref 파라미터에게 init 함수가 반환시키는 것을 할당시킨다.
  useImperativeHandle(messageRef, () => {
    return {
      open(modalDescritpion) {
        setMessage(modalDescritpion);
        // dialog를 실행시킨다.
        modalRef.current.showModal();
      },
      close() {
        setMessage(undefined);
        modalRef.current.close();
      },
    };
  });

  const onClickCloseButtonHandler = () => {
    modalRef.current.close();
  };

  return (
    <Portal>
      <dialog className="modal" ref={modalRef}>
        <div className="modal-body">
          <section
            className="modal-close-button"
            onClick={onClickCloseButtonHandler}
          >
            X
          </section>
          {message}
        </div>
      </dialog>
    </Portal>
  );
}
