import axios from 'axios';
import { ENDPOINT_FOR_UPLOAD_CLOUDINARY, CLOUD_NAME } from '../helpers/constants';
import PersonalTeaching from './PersonalTeaching';

const Cloudinary = () => {
  const unsignedUploadFile = async files => {
    let request = {};

    const requestBackend = await PersonalTeaching().getCloudinaryPreset();
    if (requestBackend.cloudinary_config) {
      const photo = new FormData();
      photo.append('file', files[0]);
      photo.append('upload_preset', requestBackend.cloudinary_config.upload_preset);

      request = await axios.post(`${ENDPOINT_FOR_UPLOAD_CLOUDINARY.replace(CLOUD_NAME, requestBackend.cloudinary_config.cloud_name)}`, photo);
    }

    return request.data;
  };

  return {
    unsignedUploadFile,
  };
};

export default Cloudinary;
