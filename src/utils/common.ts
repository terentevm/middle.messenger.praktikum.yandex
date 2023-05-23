import { FileURL } from '../classes/connector/Connector';

export function getFullFileUrl(urlFromApi: string | null) {
  if (!urlFromApi) return undefined;

  return `${FileURL}${urlFromApi}`;
}
