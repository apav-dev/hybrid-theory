import "@yext/visual-editor/style.css";
import {
  Template,
  GetPath,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import { Render } from "@measured/puck";
import {
  applyTheme,
  VisualEditorProvider,
  normalizeSlug,
  getPageMetadata,
  applyAnalytics,
  mainConfig,
  defaultThemeConfig,
} from "@yext/visual-editor";
import { AnalyticsProvider } from "@yext/pages-components";

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  const { title } = getPageMetadata(document);

  return {
    title: title,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    other: [
      // applyAnalytics(document),
      applyTheme(document, defaultThemeConfig),
    ].join("\n"),
  };
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  if (document.slug) {
    return document.slug;
  }

  const localePath = document.locale !== "en" ? `${document.locale}/` : "";
  const path = document.address
    ? `${localePath}${document.address.region}/${document.address.city}/${document.address.line1}`
    : `${localePath}${document.id}`;

  return normalizeSlug(path);
};

const Main: Template<TemplateRenderProps> = (props) => {
  const { document } = props;

  return (
    // <AnalyticsProvider
    //   apiKey={document?._env?.YEXT_PUBLIC_EVENTS_API_KEY}
    //   templateData={props}
    //   currency="USD"
    // >
    <VisualEditorProvider templateProps={props}>
      <Render config={mainConfig} data={JSON.parse(document.__.layout)} />
    </VisualEditorProvider>
    // </AnalyticsProvider>
  );
};

export default Main;
