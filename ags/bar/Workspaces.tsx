
import { Gdk, Gtk } from "astal/gtk4"
import { ToggleButton } from "../widgets/gtk/ToggleButton"

import AstalHyprland from "gi://AstalHyprland?version=0.1";
import { bind, Binding } from "astal";

type WorkspaceItemProps = {
  workspace: AstalHyprland.Workspace,
  activeWorkspace?: number
}

function WorkspaceItem({ workspace, activeWorkspace }: WorkspaceItemProps) {
  const hypr = AstalHyprland.get_default();
  return <ToggleButton
    active={bind(hypr, "focused_workspace").as((w) => w == workspace)}
    onClicked={() => {
      hypr.dispatch("workspace", workspace.id.toString())
    }}>

    <box>{bind(workspace, "name")}</box>

  </ToggleButton>
}

export default function Workspaces() {
  const hypr = AstalHyprland.get_default();


  return <box>
    {bind(hypr, "workspaces")
      .as((w) =>
        w.sort((a, b) => a.id - b.id)
          .map((ws) => <WorkspaceItem
            workspace={ws}
            activeWorkspace={undefined} />
          )
      )
    }
  </box>



}
