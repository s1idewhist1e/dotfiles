import { Gtk } from "astal/gtk4"
import SysTray from "./SysTray"
import { Variable } from "astal";
import Workspaces from "./bar/Workspaces";

export function CenterSection() {
  function onClick(self: Gtk.Button) {
    console.log(self, time.get(), "Hewwo!!!! :3");
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
