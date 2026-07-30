import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the completed Atlas landing experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /Von Newman Atlas/);
  assert.match(html, /Build skills that/);
  assert.match(html, /One connected ecosystem/);
  assert.match(html, /Learning that feels alive/);
  assert.doesNotMatch(html, /codex-preview|Building your site/);
});

test("ships connected CMS, LMS, and scroll animation workflows", async () => {
  const [atlas, journeys] = await Promise.all([
    readFile(new URL("../app/ui/AtlasExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ui/Journeys.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(atlas, /CMSFunctionalSection/);
  assert.match(atlas, /AssignmentWorkspace/);
  assert.match(atlas, /ReviewWorkspace/);
  assert.match(atlas, /LearnerWorkspace/);
  assert.match(atlas, /ScrollTrigger\.batch/);
  assert.match(journeys, /curricula:/);
  assert.match(journeys, /getCurriculum/);
  assert.match(journeys, /ScrollTrigger\.batch/);
});
