import { useI18n, translate, getLocale } from "../../i18n/index.js";
import { useState } from 'react';
export default function LocalImage({
  src,
  alt,
  fallback,
  className
}) {
  useI18n();
  const [failedSource, setFailedSource] = useState(null);
  if (!src || failedSource === src) return fallback;
  return <img className={className} src={src} alt={translate(alt)} decoding="async" onError={() => setFailedSource(src)} />;
}
