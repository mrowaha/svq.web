import React from "react";
import { observer } from "mobx-react-lite";

interface EchoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function Echo(props: EchoProps) {
  return <button {...props}>Echo</button>;
}

export default observer(Echo);
