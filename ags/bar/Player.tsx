import { bind, Variable } from "astal";
import Mpris from "gi://AstalMpris?version=0.1";

const mpris = Mpris.get_default();

export default function Player() {

  const spotify = Mpris.Player.new("spotify");

  return <box
    visible={bind(spotify, "available")}
    cssClasses={["player"]}>
    <button onClicked={() => spotify.previous()}>Prev</button>
    <box onButtonPressed={() => spotify.raise()}>{bind(spotify, "title")}</box>
    <image file={bind(spotify, "cover_art")} />
    <button onClicked={() => spotify.next()}>Next</button>
  </box >;
}
