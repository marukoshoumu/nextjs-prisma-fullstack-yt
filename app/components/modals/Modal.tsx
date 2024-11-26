"use client";

import React, { useCallback } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "@/app/components/button/Button";

type ModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  primaryLabel: string;
  secoundaryAction?: () => void;
  secoundaryLabel?: string;
  disalbled?: boolean;
  del?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  primaryLabel,
  secoundaryAction,
  secoundaryLabel,
  disalbled,
  del = false,
}) => {
  const handleClose = useCallback(() => {
    if (disalbled) {
      return;
    }
    onClose();
  }, [onClose, disalbled]);

  const handleSubmit = useCallback(() => {
    if (disalbled) {
      return;
    }
    onSubmit();
  }, [onSubmit, disalbled]);

  const handleSecoundaryAction = useCallback(() => {
    if (disalbled || !secoundaryAction) {
      return;
    }
    secoundaryAction();
  }, [secoundaryAction, disalbled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/50">
        <div className="relative mx-auto h-full w-full md:h-auto md:max-w-screen-sm">
          <div className="translate h-full duration-75">
            <div className="h-full bg-white shadow-lg md:rounded-lg">
              <div className="relative flex items-center justify-center border-b p-6">
                <div
                  className="absolute right-5 cursor-pointer rounded-full p-2 transition hover:bg-neutral-100"
                  onClick={handleClose}
                >
                  <IoMdClose size={20} />
                </div>
                <div className="text-lg font-bold">{title}</div>
              </div>
              <div className="relative flex-auto p-6">{body}</div>
              <div className="flex flex-col gap-2 px-6 pb-6">
                <div className="flex w-full flex-row items-center gap-4">
                  {secoundaryAction && secoundaryLabel && (
                    <Button
                      disabled={disalbled}
                      label={secoundaryLabel}
                      onClick={handleSecoundaryAction}
                      outline
                    />
                  )}
                  <Button
                    disabled={disalbled}
                    label={primaryLabel}
                    onClick={handleSubmit}
                    del={del}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
