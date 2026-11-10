import { assets, assetUrl } from '../../config/assets';
import LocalImage from '../common/LocalImage';
import { useI18n, translate } from '../../i18n/index.js';
export default function OdsMark() {
  useI18n();
  return <LocalImage src={assetUrl(assets.ods7)} alt={translate('ODS 7 — Energia limpa e acessível')} className="ods-image" fallback={<span className="ods">7</span>} />;
}