import { ImageRequireSource } from "react-native/types";


export interface newsPath {
  uri: ImageRequireSource;
  label: string;
}

export const images = {
  'News-1': require('./news.jpg'),
  'News-2': require('./news.jpg'),

};

export const New: newsPath[] = [
  { label: "Traffic Advisory: Road Closure on Main Street This Weekend", uri: images['News-1'], },
  { label: "Traffic Advisory: Road Closure on Main Street This Weekend", uri: images['News-2'], },
  { label: "Traffic Advisory: Road Closure on Main Street This Weekend", uri: images['News-2'], },
  // { label: 'Korensi Mini Device', value: 'KORENSI_MINI' },
  // { label: 'Korensi Lite BT Device', value: 'KORENSI_LITE_BT' },
  // { label: 'Korensi Stylish Device', value: 'KORENSI_STYLISH' },
];


// export const Status: LightCard[] = [
//   { location: 'Oba-Ile, Akure', light: true, duration: 2, faulty: false },
//   { location: 'North Gate, Akure', light: false, duration: 4, faulty: true },
//   { location: 'Alagbaka, Akure', light: true, duration: 8, faulty: false },
//   { location: 'Alagbaka, Akure', light: false, duration: 8, faulty: false },
// ];
