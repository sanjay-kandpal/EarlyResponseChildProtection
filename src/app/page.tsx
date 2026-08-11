import { readFile } from "node:fs/promises";
import { join } from "node:path";
import HeroOrbitScript from "@/components/HeroOrbitScript";
import LifecycleTabsScript from "@/components/LifecycleTabsScript";

// Faithful static clone of the privasapien.com homepage (rendered DOM captured
// as-is), with NeoStats branding and interactive patches for static sections
// that originally depended on React state (hero orbit + lifecycle curved tabs).
export default async function Home() {
  const html = await readFile(
    join(process.cwd(), "src/content/privasapien-home.html"),
    "utf8",
  );

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <HeroOrbitScript />
      <LifecycleTabsScript />
    </>
  );
}
