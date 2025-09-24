import { Gtk } from "astal/gtk4"
import SysTray from "./SysTray"
import { Variable } from "astal";

import Workspaces from "./Workspaces";
import Player from "./Player"
import Clock from "./Clock"


import { ToggleButton } from "../widgets/gtk/ToggleButton";

export function CenterSection() {
  function onClick(self: Gtk.Button) {
    console.log(":3");
  }

  return <box
    halign={Gtk.Align.CENTER} cssClasses={["center-section"]}>


    <button
      onClicked={onClick}
      halign={Gtk.Align.CENTER}
      cssClasses={["widget"]}
    >
      Welcome to AGS!
    </button>

    {/* <Player /> */}

    {/* <ToggleButton><box>:3</box></ToggleButton> */}
  </box>
}

const time = Variable("").poll(1000, "date");

export function LeftSection({gdkmonitor}: {gdkmonitor: Gdk.Monitor}) {
  return <box
    halign={Gtk.Align.START} cssClasses={["left-section"]}>

    <Workspaces cssClasses={["widget"]} />

  </box>
}

export function RightSection() {
  return <box halign={Gtk.Align.END} cssClasses={["right-section"]}>
    <Clock cssClasses={["widget"]}/>
    <SysTray cssClasses={["widget"]}/>
  </box>
}
