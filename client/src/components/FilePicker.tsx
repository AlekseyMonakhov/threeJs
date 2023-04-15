import React, { Dispatch, FC, memo, SetStateAction } from 'react';
import { CustomButton } from './index';


type Props = {
    file: File | null,
    setFile: Dispatch<SetStateAction<File | null>>,
    readFile(type: 'logo' | 'full'): void
}

const FilePicker: FC<Props> = ({ setFile, file, readFile }) => {

    return (
        <div className={'filepicker-container'}>
            <div className={'flex-1 flex flex-col'}>
                <input
                    id={'file-upload'}
                    type={'file'}
                    accept={'image/*'}
                    onChange={(e) => setFile(e.target.files![0])}
                />
                <label htmlFor={'file-upload'} className={'filepicker-label'}>
                    Upload File
                </label>

                <p className={'mt-2 text-gray-500 text-xs truncate'}>
                    {file === null ? "No file selected" : file.name}
                </p>
            </div>

            <div className={'mt-4 flex flex-wrap gap-3'}>
                <CustomButton disabled={file === null} type={'outline'} title={'Logo'} customStyles={'text-xs'} handleClick={() => readFile('logo')}/>
                <CustomButton disabled={file === null} type={'filled'} title={'Full'} customStyles={'text-xs'} handleClick={() => readFile('full')}/>
            </div>
        </div>
    );
};

export default memo(FilePicker);
