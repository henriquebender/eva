// Arquivos locais em public/assets. Use nomes relativos, por exemplo 'eva-logo.png'.
// null preserva o visual atual até os arquivos originais estarem disponíveis.
export const assets = { brandLogo: 'eva-logo.png', ods7: 'ods-7.png' };
export function assetUrl(filename) { return filename ? import.meta.env.BASE_URL + 'assets/' + filename : null; }