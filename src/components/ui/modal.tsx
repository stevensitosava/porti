import React, { useRef, useId, useState } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useFocusTrap } from '@/hooks/use-focus-trap';

/**
 * @interface ModalProps
 * @description Props for the Modal component.
 * @property {React.ReactNode} children - The content to be rendered inside the modal.
 * @property {boolean} isOpen - Controls the visibility of the modal.
 * @property {() => void} onClose - Callback function to be called when the modal is closed.
 */
interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const startClipPath = 'M1 0 H1 V1 H1 Q1 .5 1 0';
const midOpenClipPath = 'M1 0 H1 V1 H1 Q0.75 .5 1 0';
const midCloseClipPath = 'M0 0 H1 V1 H0 Q0.25 .5 0 0';
const endClipPath = 'M0 0 H1 V1 H0 Q0 .5 0 0';

const Modal = ({ children, isOpen, onOpen, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const clipPathId = useId();
  const [shouldRender, setShouldRender] = useState(isOpen);

  useFocusTrap({
    containerRef: modalRef as React.RefObject<HTMLElement>,
    isActive: shouldRender,
    initialFocusRef: closeButtonRef as React.RefObject<HTMLElement>,
    onEscape: onClose,
  });

  useGSAP(
    () => {
      const $path = modalRef.current?.querySelector(`#${clipPathId} path`) ?? null;

      if (isOpen) {
        setShouldRender(true);
        document.body.classList.add('overflow-hidden'); // Prevent scrolling background

        gsap
          .timeline({
            onStart: () => {
              onOpen();
            },
          })
          .fromTo(
            $path,
            { attr: { d: startClipPath } },
            {
              attr: { d: midOpenClipPath },
              duration: 0.6,
              ease: 'power3.in',
            },
          )
          .to($path, {
            attr: { d: endClipPath },
            duration: 0.9,
            ease: 'power3.out',
          });
      } else {
        gsap
          .timeline({
            onComplete: () => {
              setShouldRender(false);
              document.body.classList.remove('overflow-hidden'); // Restore scrolling
            },
          })
          .fromTo(
            $path,
            { attr: { d: endClipPath } },
            {
              attr: { d: midCloseClipPath },
              duration: 0.6,
              ease: 'power3.in',
            },
          )
          .to($path, {
            attr: { d: startClipPath },
            duration: 0.9,
            ease: 'power3.out',
          });
      }
    },
    { scope: modalRef, dependencies: [isOpen] },
  );

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      className={cn(
        'fixed inset-0',
        'overflow-y-auto z-10',
        'min-h-screen',
        'bg-gray-900 text-gray-500',
        !shouldRender && 'hidden',
      )}
      style={{
        WebkitClipPath: `url(#${clipPathId})`,
        clipPath: `url(#${clipPathId})`,
      }}
      data-lenis-prevent
    >
      <svg
        className="absolute"
        width="0"
        height="0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
            <path d={startClipPath} />
          </clipPath>
        </defs>
      </svg>

      <button
        ref={closeButtonRef}
        className={cn('fixed top-8 right-8', 'cursor-pointer', 'group')}
        aria-label="Close"
        onClick={() => onClose()}
      >
        <X className={cn('transition-all', 'group-hover:text-white group-hover:rotate-90')} />
      </button>

      {children}
    </div>
  );
};

export default Modal;
