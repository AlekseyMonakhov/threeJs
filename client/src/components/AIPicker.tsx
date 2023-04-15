import React, { FC, memo } from 'react';
import CustomButton from './CustomButton';


type Props = {
    prompt: string,
    setPrompt: React.Dispatch<React.SetStateAction<string>>,
    generatingImg: boolean,
    handleSubmit(logo: "logo" | "full"): void
}

const AIPicker: FC<Props> = ({ handleSubmit, setPrompt, prompt, generatingImg }) => {

    return (
        <div className={'aipicker-container'}>
            <textarea
                className={'aipicker-textarea'}
                placeholder={'Ask Ai'}
                rows={5}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <div className={'flex flex-wrap gap-3'}>
                {generatingImg ? (
                    <CustomButton type={'outline'} title={'Asking AI...'} customStyles={'text-xs'}/>
                    )
                    : (
                        <>
                            <CustomButton type={'outline'} title={'Ai Logo'} customStyles={'text-xs'} handleClick={() => handleSubmit('logo')}/>
                            <CustomButton type={'filled'} title={'Ai Full'} customStyles={'text-xs'} handleClick={() => handleSubmit('full')}/>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default memo(AIPicker);
