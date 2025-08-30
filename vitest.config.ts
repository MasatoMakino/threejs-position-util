import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "jsdomTest",
    environment: "jsdom",
    environmentOptions: {
      jsdom: {
        resources: "usable",
      },
    },
    coverage: {
      provider: "istanbul",
      reporter: ["text", "lcov", "json-summary", "json"],
      reportOnFailure: true,
      include: ["src/**/*.ts"],
    },
  },
});
