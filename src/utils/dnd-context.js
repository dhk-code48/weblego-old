import React from "react";
import PropTypes from "prop-types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const GlobalDndContext = (props) => {
  return <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>;
};

GlobalDndContext.propTypes = { children: PropTypes.node };

export default GlobalDndContext;
