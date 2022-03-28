import { MAPS_API_KEY } from '../config';

export const reverseGeoCode = async (latitude, longitude) => {
  const addressFields = { lat: latitude, lon: longitude, zipCode: '', state: '', city: '', country: '' };
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${MAPS_API_KEY}`
  );
  const data = await response.json();
  if (data?.results[0]) {
    addressFields.name = data?.results[0].formatted_address;
    data?.results[0].address_components.forEach((component) => {
      if (component.types.includes('postal_code')) {
        addressFields.zipCode = component.long_name;
      } else if (component.types.includes('administrative_area_level_1')) {
        addressFields.state = component.long_name;
      } else if (component.types.includes('administrative_area_level_2')) {
        addressFields.city = component.long_name;
      } else if (component.types.includes('country')) {
        addressFields.country = component.short_name;
      }
    });
  }
  return addressFields;
};
