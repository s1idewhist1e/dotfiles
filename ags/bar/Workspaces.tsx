
import { Gdk, Gtk } from "astal/gtk4"
import { ToggleButton } from "../widgets/gtk/ToggleButton"

import AstalHyprland from "gi://AstalHyprland?version=0.1";
import { bind, Binding } from "astal";

type WorkspaceItemProps = {
  workspace: AstalHyprland.Workspace,
  activeWorkspace?: number
}

const hypr = AstalHyprland.get_default();

function WorkspaceItem({ workspace, activeWorkspace }: WorkspaceItemProps) {
  return <ToggleButton
    active={bind(hypr, "focused_workspace").as((w) => w == workspace)}
    onClicked={() => {
      if (workspace != hypr.focused_workspace) {
        hypr.dispatch("workspace", workspace.id.toString());
      }
    }}>

    <box>{bind(workspace, "name")}</box>

  </ToggleButton>
}

export default function Workspaces() {
  return <box>
    {bind(hypr, "workspaces")
      .as((workspaces) => {
        const ws_toggles = workspaces
          .sort((a, b) => a.id - b.id)
          .map((ws) => <WorkspaceItem workspace={ws} /> as Gtk.ToggleButton)

        for (let i = 0; i < ws_toggles.length - 1; ++i) {
          ws_toggles[i].set_group(ws_toggles[i + 1]);
        }

        return ws_toggles;

      })
    }
  </box>



}
