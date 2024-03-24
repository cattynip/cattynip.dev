import fs from "fs";
import path from "path";

async function buildImages() {
  copyDir("./images", "./dist");
}

async function copyDir(src: string, dest: string) {
  await fs.promises.mkdir(dest, { recursive: true });
  const files = await fs.promises.readdir(src);

  for (const file of files) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    const stat = await fs.promises.stat(srcFile);
    if (stat.isDirectory()) {
      await copyDir(srcFile, destFile);
    } else {
      await fs.promises.copyFile(srcFile, destFile);
    }
  }
}

export default buildImages;
