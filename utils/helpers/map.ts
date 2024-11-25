import * as maptilersdk from '@maptiler/sdk';
import { MAP_DEFAULT_CONFIG, MAPTILER_API_KEY } from '../constants/map';

interface IAddImageToMap {
  map: MapType;
  id: string;
  path: string;
}
const addImageToMap = async ({
  map,
  id,
  path
}: IAddImageToMap): Promise<void> => {
  try {
    const image = await map.loadImage(path);
    map.addImage(id, image.data);
  } catch (error) {
    //TODO: This is intentional and needs to be addressed.
  }
};

interface ICreateMapInstanceParams {
  containerID: string;
  options?: Partial<maptilersdk.MapOptions>;
  onCreateMap?: (map: MapType) => void;
}
const createMapInstance = ({
  containerID,
  onCreateMap,
  options = {}
}: ICreateMapInstanceParams): MapType => {
  maptilersdk.config.apiKey = MAPTILER_API_KEY;
  const map = new maptilersdk.Map({
    container: containerID,
    ...MAP_DEFAULT_CONFIG,
    ...options
  }) as MapType;

  onCreateMap && onCreateMap(map);
  return map;
};

const changeMapCursor = (map: MapType, cursor: string) => {
  map.getCanvas().style.cursor = cursor;
};

export { addImageToMap, createMapInstance, changeMapCursor };
