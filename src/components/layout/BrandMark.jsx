import { useI18n, translate, getLocale } from "../../i18n/index.js";
import { assets, assetUrl } from '../../config/assets';
import LocalImage from '../common/LocalImage';
export default function BrandMark({
  imageSrc = assetUrl(assets.brandLogo)
}) {
  useI18n();
  return <span className="brand"><LocalImage src={imageSrc} alt={translate("EVA — Energia Verde")} className="brand-image" fallback={<><span className="brand-word">{translate("eva")}<span>✳</span></span><span className="brand-label">{translate("ENERGIA VERDE")}</span></>} /></span>;
}
