import { useContext, useState } from "react";
import { TabsContext } from "../../../../contexts/tabsContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";

import { Link, useNavigate } from "react-router-dom";
import { alertContext } from "../../../../contexts/alertContext";
import { undoRedoContext } from "../../../../contexts/undoRedoContext";
import FlowSettingsModal from "../../../../modals/flowSettingsModal";
import IconComponent from "../../../genericIconComponent";
import { Button } from "../../../ui/button";

export const MenuBar = ({ flows, tabId }) => {
  const { addFlow } = useContext(TabsContext);
  const { setErrorData } = useContext(alertContext);
  const { undo, redo } = useContext(undoRedoContext);
  const [openSettings, setOpenSettings] = useState(false);

  const navigate = useNavigate();

  function handleAddFlow() {
    try {
      addFlow(null, true).then((id) => {
        navigate("/flow/" + id);
      });
      // saveFlowStyleInDataBase();
    } catch (err) {
      setErrorData(err);
    }
  }
  let current_flow = flows.find((flow) => flow.id === tabId);

  return (
    <div className="round-button-div">
      <Link to="/">
        <IconComponent name="ChevronLeft" className="w-4" />
      </Link>
      <div className="header-menu-bar">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button asChild variant="primary" size="sm">
              <div className="header-menu-bar-display">
                <div className="header-menu-flow-name">{current_flow.name}</div>
                <IconComponent name="ChevronDown" className="h-4 w-4" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                handleAddFlow();
              }}
              className="cursor-pointer"
            >
              <IconComponent name="Plus" className="header-menu-options" />
              New
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setOpenSettings(true);
              }}
              className="cursor-pointer"
            >
              <IconComponent
                name="Settings2"
                className="header-menu-options "
              />
              Settings
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                undo();
              }}
              className="cursor-pointer"
            >
              <IconComponent name="Undo" className="header-menu-options " />
              Undo
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                redo();
              }}
              className="cursor-pointer"
            >
              <IconComponent name="Redo" className="header-menu-options " />
              Redo
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <FlowSettingsModal
          open={openSettings}
          setOpen={setOpenSettings}
        ></FlowSettingsModal>
      </div>
    </div>
  );
};

export default MenuBar;
