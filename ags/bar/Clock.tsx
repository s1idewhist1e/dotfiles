import { time } from "../utils"

export default function Clock() {
	return <label
		label={time((t) => t.format("%H:%M:%S") || "")} />;
}
