import { Astal, Gtk, Gdk } from "ags/gtk4"
import App from "ags/gtk4/app"
import { LeftSection, CenterSection, RightSection } from "./sections"
import { createPoll } from "ags/time"

const time = createPoll("", 1000, "date");

export default function Bar(gdkmonitor: Gdk.Monitor) {
	const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

	return (<window
		visible
		cssClasses={["Bar"]}
		gdkmonitor={gdkmonitor}
		exclusivity={Astal.Exclusivity.EXCLUSIVE}
		anchor={TOP | LEFT | RIGHT}
		application={App}>
		<centerbox>
			<LeftSection $type="start" gdkmonitor={gdkmonitor} />
			<CenterSection $type="center" />
			<RightSection $type="end" />
		</centerbox>
	</window>);

}
// <box $type="center" />
// <box $type="start" />
