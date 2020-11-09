import axios from 'axios';
import { ENDPOINT_FOR_UPLOAD_CLOUDINARY } from '../helpers/constants';
// import { BACKEND_PERSONAL_TEACHING } from '../helpers/keys';

const Cloudinary = () => {
  const onSuccess = ({ data }) => data;
  const onFail = error => error;

  const unsignedUploadFile = async files => {
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'graphql-course');

    const request = await axios.post(`${ENDPOINT_FOR_UPLOAD_CLOUDINARY}`).then(onSuccess, onFail);
    const { isAxiosError } = { ...request };

    if (isAxiosError) {
      return {
        error: true,
      };
    }

    return request;
  };

  return {
    unsignedUploadFile,
  };
};

export default Cloudinary;
