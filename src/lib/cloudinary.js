const DEFAULT_FOLDER = "mayapur/mayapur";

function normalizeAssetPath(path) {
  return String(path ?? "")
    .trim()
    .replace(/^\/+/, "")
    .replace(/^public\//, "")
    .replace(/\\/g, "/");
}

export function cloudinaryAsset(path, options = {}) {
  const normalizedPath = normalizeAssetPath(path);

  if (!normalizedPath) {
    return "";
  }

  if (normalizedPath.startsWith("http://") || normalizedPath.startsWith("https://")) {
    return normalizedPath;
  }

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    return `/${normalizedPath}`;
  }

  const folder = normalizeAssetPath(options.folder ?? DEFAULT_FOLDER);
  const relativePath = normalizedPath === folder ? "" : normalizedPath;
  const withoutExtension = relativePath.replace(/\.[^/.]+$/, "");
  const publicId = [folder, withoutExtension].filter(Boolean).join("/").replace(/\/+/g, "/").replace(/\/$/, "");

  const transforms = [
    "q_auto",
    "f_auto",
    options.width ? `w_${options.width}` : null,
    options.height ? `h_${options.height}` : null,
    options.crop ? `c_${options.crop}` : null,
  ].filter(Boolean);

  const transformSegment = transforms.length ? `${transforms.join(",")}/` : "";

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformSegment}${publicId}`;
}

export function cloudinaryUrl(path, config = {}) {
  return cloudinaryAsset(path, config);
}
