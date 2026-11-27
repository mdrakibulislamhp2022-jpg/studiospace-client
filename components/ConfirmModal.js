"use client";

import { useEffect, useRef } from "react";

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Keep it",
  tone = "error",
  loading = false,
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle" onClose={onCancel}>
      <div className="modal-box">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-3 opacity-80">{message}</p>
        <div className="modal-action">
          <button type="button" onClick={onCancel} disabled={loading} className="btn btn-ghost">
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`btn ${tone === "error" ? "btn-error" : "btn-primary"}`}
          >
            {loading ? <span className="loading loading-spinner loading-sm" /> : confirmLabel}
          </button>
        </div>
      </div>
      <div className="modal-backdrop">
        <button type="button" onClick={onCancel} aria-label="Close">
          close
        </button>
      </div>
    </dialog>
  );
}