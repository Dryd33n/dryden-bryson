import InfiniteImageGallery from '@/components/Components/InfiniteImageGallery/InfiniteImageGallery';
import React from 'react';

const Page: React.FC = () => {
    const languageImages = ["java.svg", "python.svg", "typescript.svg", "c.svg", "c-sharp.svg", "r.svg","assembly.svg"];
    const socialImages = ["html.svg", "css.svg", "tailwind.svg", "react.svg", "next.svg", "scenebuilder.svg", "pyqt.svg"];
    const repeatedImages1 = ["github.svg", "linkedin.svg", "window.svg"];
    const repeatedImages2 = ["github.svg", "linkedin.svg", "window.svg"];

    return (<>
        <div className='mt-20 mx-[20vw]'>
            <InfiniteImageGallery direction={"right"} imageHrefs={languageImages} imageHeight={65} />
            <InfiniteImageGallery direction={"left"} imageHrefs={socialImages} imageHeight={65} />
            <InfiniteImageGallery direction={"right"} imageHrefs={repeatedImages1} imageHeight={65} />
            <InfiniteImageGallery direction={"left"} imageHrefs={repeatedImages2} imageHeight={65} />
        </div>
        </>
    );
};

export default Page;