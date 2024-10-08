"use client";

import React, { MouseEvent, PropsWithChildren, useEffect, useRef } from "react";

type TModal = {
  onClose: () => void;
  closeOnEsc?: boolean;
  closeOnBackdrop?: boolean;
};

const Modal = ({
  children,
  onClose,
  closeOnBackdrop = true,
  closeOnEsc = true,
}: PropsWithChildren<TModal>) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (closeOnEsc) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [onClose, closeOnEsc]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm backdrop-filter backdrop-brightness-100 bg-black/25"
      onClick={closeOnBackdrop ? handleClickOutside : () => {}}
    >
      <div className="w-full" ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
