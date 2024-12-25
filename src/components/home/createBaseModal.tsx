import React, { useState } from "react";
import { api } from "~/utils/api";

interface CreateBaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateBaseModal: React.FC<CreateBaseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [input, setInput] = useState("");

  const ctx = api.useUtils();
  const { mutate, status } = api.base.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.base.getAll.invalidate();
      onClose();
    },
  });
  const isCreating = status === "pending";
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="flex">
          <span className="text-gray-600">Create Base</span>
          <input
            type="text"
            placeholder="Base name..."
            className="bg-transparent pl-1 text-xs text-gray-800 placeholder-gray-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isCreating}
          />
          <button onClick={() => mutate({ name: input })}>Done</button>
        </div>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 90%;
          max-width: 500px;
          position: relative;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        .modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default CreateBaseModal;
