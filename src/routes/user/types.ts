type ExternalUrl = {
  spotify: string;
};
type Artist = {
  name: string;
  type: string;
  uri: string;
  id: string;
  href: string;
  external_url: ExternalUrl;
};
type Image = {
  url: string;
  height: number;
  width: number;
};
type Album = {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrl;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};
export type Track = {
  album: Album;
  artists: Artist[];
  availableMarkets: string[];
  discNumber: number;
  durationMs: number;
  explicit: boolean;
  externalIds: {
    isrc: string;
  };
  externalUrls: { spotify: string };
  href: string;
  id: string;
  isLocal: boolean;
  name: string;
  popularity: number;
  previewUrl: string;
  trackNumber: number;
  type: string;
  uri: string;
};
export type SpotifyUser = {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  type: string;
  uri: string;
  followers: {
    href: string | null;
    total: number;
  };
  country: string;
  product: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  email: string;
};
