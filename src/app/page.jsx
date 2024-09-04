"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <a href="intent://arvr.google.com/scene-viewer/1.0?file=https://raw.githubusercontent.com/alanjmr21/nextjs-ar-blender/android-ar/public/Mesh_container.gltf;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;">Avocado</a>
    </div>
  );
}
