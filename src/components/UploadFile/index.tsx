import React from 'react';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { useTypedSelector } from 'store';

type Props = {
  onUploadFile: (id: string) => void;
  className?: string;
};

const UploadFile: React.FC<Props> = ({ className = '', onUploadFile }) => {
  const token = useTypedSelector((state) => state.user.token);

  const openFilePicker = () => {
    const picker = document.createElement('input');
    picker.type = 'file';
    picker.onchange = onFileUpload;

    picker.click();
  };

  const onFileUpload = async (event: any) => {
    const file = event.target!.files![0];
    const data = new FormData();
    data.append('file', file);

    try {
      const response = (
        await axios({
          method: 'post',
          url: process.env.REACT_APP_FILE_URL,
          data,
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data[0];

      onUploadFile(response._id);
    } catch (e) {
      console.error('Error while uploading avatar', e);
    }
  };
  return <UploadOutlined className={className} onClick={openFilePicker} />;
};

export default UploadFile;
