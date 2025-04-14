
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
    halign={Gtk.Align.CENTER}

    cursor={Gdk.Cursor.new_from_name("pointer", null)}

    canFocus={false}

    active={bind(hypr, "focused_workspace").as((w) => w === workspace)}
    onClicked={() => {
      if (workspace != hypr.focused_workspace) {
        hypr.dispatch("workspace", workspace.id.toString());
      }
    }}>

    <box>{
      bind(workspace, "name").as((name) => {
        return name;
      })
    }</box>

  </ToggleButton>
}

function WorkspaceSelector() {
  return <box cssClasses={["workspace-selector"]} spacing={2} >
    {
      bind(hypr, "workspaces")
        .as((workspaces) => {
          const ws_toggles = workspaces
            .sort((a, b) => a.id - b.id)
            .map((ws) => <WorkspaceItem workspace={ws} /> as Gtk.ToggleButton)

          for (let i = 0; i < ws_toggles.length - 1; ++i) {
            ws_toggles[i].set_group(ws_toggles[i + 1]);
          }

          ws_toggles.forEach(element => {
            element.child.set_halign(Gtk.Align.CENTER);
          });

          return ws_toggles;

        })
    }
  </box >
}

function WindowTitle() {
  return <box
    cssClasses={["window-title"]}
    halign={Gtk.Align.CENTER}
    valign={Gtk.Align.CENTER}
  >
    Placeholder
  </box>
}

export default function Workspaces() {
  return <box cssClasses={["workspaces"]}>
    <WorkspaceSelector />
    <WindowTitle />
  </box>
}
