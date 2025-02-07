
import { bind } from "astal"
import { Gtk } from "astal/gtk4";

import Tray from "gi://AstalTray"

const tray = Tray.get_default();

function TrayItem({ item }: { item: Tray.TrayItem }) {
  return <menubutton
    tooltipMarkup={bind(item, "tooltipMarkup")}
    menuModel={bind(item, "menuModel")}
    setup={
      (self: Gtk.Widget) => self.insert_action_group("dbusmenu", item.actionGroup)
    }>

    <image gicon={bind(item, "gicon")} />

  </menubutton>
}

export default function SysTray() {
  return (
    <box>
      {bind(tray, "items").as((items) => {
        return items
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((item) => <TrayItem item={item} />)
      })}
    </box>
  )
}


