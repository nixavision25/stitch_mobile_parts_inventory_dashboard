import Icon from "./Icon";

const SIZES = {
  md: "max-w-md",
  lg: "max-w-2xl",
};

export default function Modal({ open, onClose, title, titleIcon, children, size = "md" }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-ink/40 backdrop-blur-xs flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`bg-surface rounded-xl ${SIZES[size]} w-full p-5 sm:p-6 shadow-2xl flex flex-col gap-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {titleIcon && <Icon name={titleIcon} className="text-primary text-xl" />}
            <h3 className="text-headline-md text-ink">{title}</h3>
          </div>
          <button
            type="button"
            className="text-ink-muted hover:text-ink p-1 rounded"
            onClick={onClose}
            aria-label="Close"
          >
            <Icon name="close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
