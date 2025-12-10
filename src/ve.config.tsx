import { type Config } from "@measured/puck";
import "@yext/visual-editor/style.css";
import "./index.css";
import {
  DirectoryCategory,
  DirectoryCategoryComponents,
  DirectoryCategoryProps,
  MainConfigProps,
  mainConfig,
} from "@yext/visual-editor";
import { HeadingTextProps, HeadingText } from "./components/HeadingText";

interface DevProps {
  HeadingText: HeadingTextProps;
}

const components: Config<DevProps>["components"] = {
  HeadingText: HeadingText,
};

export const devConfig: Config<DevProps> = {
  components,
  root: mainConfig.root,
};

export const componentRegistry: Record<
  string,
  Config<MainConfigProps | DevProps>
> = {
  "hybrid-location": devConfig,
  main: mainConfig,
};
