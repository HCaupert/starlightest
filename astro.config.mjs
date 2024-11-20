// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi";
import starlightImageZoom from "starlight-image-zoom";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Express Checkout",
      customCss: ["./src/style/theme.css"],
      social: {
        github: "https://github.com/withastro/starlight",
      },
      sidebar: [
        {
          label: "Getting Started",
          link: "gettingstarted",
        },
        { label: "Widget", autogenerate: { directory: "usecase" } },
        { label: "Theming", autogenerate: { directory: "theming" } },
        ...openAPISidebarGroups,
      ],
      plugins: [
        // Generate the OpenAPI documentation pages.
        starlightOpenAPI([
          {
            base: "api",
            label: "Core API",
            schema: "https://core-api-dev.express-checkout.workers.dev/doc",
          },
        ]),
        starlightImageZoom(),
      ],
    }),
  ],
});
