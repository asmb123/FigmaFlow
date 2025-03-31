import type { Route } from "./+types/home";
import FigmaToCode from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FigmaFlow" },
    { name: "Convert figma design to code", content: "Welcome to FigmaFlow" },
  ];
}

export default function Home() {
  return <FigmaToCode />;
}
