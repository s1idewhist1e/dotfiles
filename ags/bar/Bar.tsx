import { App, Astal, Gtk, Gdk, Widget } from "astal/gtk4"
import { bind, Variable, GLib } from "astal"
import { LeftSection, CenterSection, RightSection } from "./sections"

const time = Variable("").poll(1000, "date")

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor


    const bar = <window
        visible
        cssClasses={["Bar"]}
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        application={App}>
        <centerbox cssName="centerbox">
            <LeftSection />
            <CenterSection />
            <RightSection />
        </centerbox>
    </window>

}
