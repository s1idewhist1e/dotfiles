
import { Gdk, Gtk } from "astal/gtk4"
import { ToggleButton } from "../widgets/gtk/ToggleButton"

import AstalHyprland from "gi://AstalHyprland?version=0.1";
import { bind, Binding } from "astal";
import { BoxProps } from "astal/gtk4/widget";

type WorkspaceItemProps = {
  workspace: AstalHyprland.Workspace,
  activeWorkspace?: number
}

const hypr = AstalHyprland.get_default();

function numberToChineseNumeral(num: number): String {
  if (num === 0) return "〇";
  if (num >= 10_000) return num.toString(); // cba to implement it for myriads
  const digits = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const powers = ["", "十", "百", "千"];

  let power = 0;
  let str = "";

  while (num > 0) {
    const currentDigit = num % 10;
    if (currentDigit !== 0) {
      str = powers[power] + str;

      if (currentDigit !== 1 || power === 0) {
        str = digits[currentDigit] + str;
      }

    }

    num = Math.floor(num / 10);
    power++;

  }

  return str;
}

function WorkspaceItem({ workspace, activeWorkspace }: WorkspaceItemProps) {

  return <ToggleButton
    halign={Gtk.Align.CENTER}

    cssClasses={["workspace-item"]}

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
        return numberToChineseNumeral(name);
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
  return bind(hypr, "focused-client").as((client: AstalHyprland.Client) => {
    let widget = <box
      cssClasses={["window-title"]}
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
    >
      {client.get_title()}
    </box>;

    return widget;

  });

}

export default function Workspaces() {
  return <box cssClasses={["workspaces", "widget"]}>
    <WorkspaceSelector />
    <WindowTitle />
  </box>
}
