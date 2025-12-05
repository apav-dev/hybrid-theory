import "@yext/visual-editor/editor.css";
import "../index.css";
import {
  applyTheme,
  defaultThemeConfig,
  directoryConfig,
  Editor,
  locatorConfig,
  mainConfig,
  usePlatformBridgeDocument,
  usePlatformBridgeEntityFields,
  VisualEditorProvider,
} from "@yext/visual-editor";
import {
  GetPath,
  TemplateProps,
  TemplateConfig,
  HeadConfig,
  TemplateRenderProps,
  GetHeadConfig,
} from "@yext/pages";
import { type Config } from "@measured/puck";
import tailwindConfig from "../../tailwind.config";

const componentRegistry: Record<string, Config<any>> = {
  "hybrid-location": mainConfig,
  main: mainConfig,
  directory: directoryConfig,
  locator: locatorConfig,
};

// Editor is available at /edit
export const getPath: GetPath<TemplateProps> = () => {
  return "edit";
};

export const config: TemplateConfig = {
  name: "edit",
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    other: applyTheme(document, defaultThemeConfig),
  };
};

// Render the editor
const Edit: () => JSX.Element = () => {
  const entityDocument = usePlatformBridgeDocument();
  const entityFields = usePlatformBridgeEntityFields();

  return (
    <VisualEditorProvider
      templateProps={{
        document: entityDocument,
      }}
      entityFields={entityFields}
      tailwindConfig={tailwindConfig}
    >
      <Editor
        document={entityDocument}
        componentRegistry={componentRegistry}
        themeConfig={defaultThemeConfig}
      />
    </VisualEditorProvider>
  );
};

export default Edit;
