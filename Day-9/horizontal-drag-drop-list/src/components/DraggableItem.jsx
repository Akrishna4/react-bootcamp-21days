import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./DraggableItem.css";

const DraggableItem = ({ id, item }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      className="item-card"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <span className="material-symbols-outlined">drag_indicator</span>
      <div className="char-avatar">{item.label.charAt(0)}</div>
      <p className="label">{item.label}</p>
    </div>
  );
};

export default DraggableItem;
