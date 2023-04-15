import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import store from '../store';
import state from '../store';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import Tab from '../components/Tab';
import { AIPicker, ColorPicker, CustomButton, FilePicker } from '../components';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabsType } from '../types';
import { download } from '../assets';
import FilterTab from '../components/FilterTab';


const Customizer = () => {
    const snap = useSnapshot(state);

    const [file, setFile] = useState<File | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [generatingImg, setGeneratingImg] = useState(false);

    const [activeEditorTab, setActiveEditorTab] = useState<EditorTabsType>('');
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    });

    const setActiveEditorTabHandler = useCallback((current : EditorTabsType) => {
        setActiveEditorTab((prev) => prev === current ? "" : current)
    },[])

    const generateTabContent = () => {
        switch (activeEditorTab) {
            case 'colorpicker':
                return <ColorPicker />;
            case 'filepicker':
                return <FilePicker
                    file={file}
                    setFile={setFile}
                    readFile={readFile}
                />;
            case 'aipicker':
                return <AIPicker
                prompt={prompt}
                setPrompt={setPrompt}
                generatingImg={generatingImg}
                handleSubmit={handleSubmit}

                />;
            default:
                return null;
        }
    };

    const handleSubmit = async(type) => {
        if(!prompt) {
            return alert('Please enter prompt')
        }

        try {
            setGeneratingImg(true);

            const response = await fetch('http://localhost:8080/api/v1/dalle', {
                method: "POST",
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify({prompt}),
            });
            const data = await response.json();

            handleDecals(type, `data:image/png;base64,${data.photo}`)

        }catch (err){
            alert(err);
        }finally {
            setGeneratingImg(false);
            setActiveEditorTab("");
        }
    }

    const handleDecals = (type:"logo" | "full", result) => {
        const decalType = DecalTypes[type];

        state[decalType.stateProperty] = result;

        if(!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab)
        }
    }

    const handleActiveFilterTab = (tabName:string) => {

        switch (tabName) {
            case 'logoShirt':
                state.isLogoTexture = !activeFilterTab[tabName];
                break;
            case 'stylishShirt':
                state.isFullTexture = !activeFilterTab[tabName];
                break;
            default:
                state.isFullTexture = false;
                state.isLogoTexture = true;
                break;
        }

        setActiveFilterTab((prevState) => {
            return {
                ...prevState,
                [tabName]: !prevState[tabName]
            }
        })
    }

    const readFile = (type: "logo" | "full") => {
        reader(file)
            .then((result) => {

                handleDecals(type, result);
                setActiveEditorTab("");
            })
    }

    const customButtonClickHandler = useCallback(() => {
        store.intro = true
    }, [])

    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.div
                        key={'custom'}
                        className={'absolute top-0 left-0 z-10'}
                        {...slideAnimation('left')}
                    >
                        <div className={'flex items-center min-h-screen'}>
                            <div className={'editortabs-container tabs'}>
                                {EditorTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tabName={tab.name}
                                        tabIcon={tab.icon}
                                        handleClick={setActiveEditorTabHandler}
                                    />
                                ))}

                                {generateTabContent()}
                            </div>
                        </div>

                    </motion.div>

                    <motion.div
                        className={'absolute z-10 top-5 right-5'}
                        {...fadeAnimation}
                    >
                        <CustomButton
                            type={'filled'} title={'Go back'}
                            customStyles={'w-fit px-4 py-2.5 font-bold text-sm'}
                            handleClick={customButtonClickHandler} />
                    </motion.div>

                    <motion.div
                        className={'filtertabs-container'}
                        {...slideAnimation('up')}
                    >
                        {FilterTabs.map((tab) => (
                            <FilterTab
                                key={tab.name}
                                tabName={tab.name}
                                tabIcon={tab.icon}
                                isActiveTab={activeFilterTab[tab.name]}
                                handleClick={handleActiveFilterTab}
                            />
                        ))}
                        <button className='download-btn' onClick={downloadCanvasToImage}>
                            <img
                                src={download}
                                alt='download_image'
                                className='w-3/5 h-3/5 object-contain'
                            />
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Customizer;
