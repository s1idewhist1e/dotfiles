import { Gtk } from "astal/gtk4"
import SysTray from "./SysTray"
import { Variable } from "astal";
import Workspaces from "./Workspaces";

import { ToggleButton } from "../widgets/gtk/ToggleButton";

export function CenterSection() {
  function onClick(self: Gtk.Button) {
    console.log(":3");
  }

  return <box
    halign={Gtk.Align.CENTER}>


    <button
      onClicked={onClick}
      hexpand
      halign={Gtk.Align.CENTER}
    >
      Welcome to AGS!
    </button>

    <ToggleButton><box>:3</box></ToggleButton>
  </box>
}

const time = Variable("").poll(1000, "date");

export function LeftSection() {
  return <box
    halign={Gtk.Align.START}>

    <Workspaces />

  </box>
}

export function RightSection() {
  return <box halign={Gtk.Align.END}>
    <SysTray />
  </box>
}
