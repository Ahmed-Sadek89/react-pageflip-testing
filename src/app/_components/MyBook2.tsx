import Image from 'next/image';
import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import { pagesData } from './data';

interface PagesProps {
    number?: number;
    title?: string; 
    content?: string; 
    image?: string;
    children?: React.ReactNode; 
}

const Pages = React.forwardRef<HTMLDivElement, PagesProps>(({ number, title, content, image, children }, ref) => {
    return (
        <div
            className="space-y-10 text-center shadow-lg bg-white p-6"
            ref={ref}
            style={{ minHeight: '100vh', minWidth: '100%' }} 
        >
            {children ? (
                <div>{children}</div>
            ) : (
                <div className="flex flex-col w-full items-center justify-center">
                    {title && <h2 className="text-2xl font-semibold mt-2 text-gray-800">{title}</h2>}
                    {image && <Image src={image} alt={`Page ${number}`} width={1000} height={1000} className="object-fill h-72 w-3/4" />}
                    {content && <p className="mt-1 text-lg text-center text-gray-600 pb-2 border-b border-b-black">{content}</p>}
                    {number && (
                        <>
                            <hr />
                            <span>Page {number}</span>
                        </>
                    )}
                </div>
            )}
        </div>
    );
});

Pages.displayName = 'Pages';

const Flipbook: React.FC = () => {

    return (
        <div className='w-screen flex flex-col gap-5 justify-center items-center bg-gray-900 overflow-hidden mx-10'>
            <h1 className='text-3xl text-white text-center font-bold'>FlipBook</h1>
            <HTMLFlipBook
                width={300}
                minWidth={300}
                maxWidth={800}
                height={250}
                minHeight={250}
                maxHeight={533}
                size="stretch"
                maxShadowOpacity={0.7}
                className="shadow-2xl"
                style={{ backgroundColor: '#f5f5f5', borderRadius: '10px' }}
                startPage={0}
                drawShadow={true}
                flippingTime={1000}
                usePortrait={true}
                startZIndex={0}
                autoSize={true}
                showCover={true}
                mobileScrollSupport={true}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={0}
                showPageCorners={true}
                disableFlipByClick={true}
            >
                {/* Cover Page */}
                <Pages>
                    <h1 className="text-4xl font-bold text-gray-800">Welcome to the Flipbook</h1>
                    <p className="text-xl text-gray-600 mt-5">An Interactive Experience</p>
                    <Image
                        src="https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9vayUyMGNvdmVyfGVufDB8fDB8fHww"
                        alt="Cover Image"
                        width={800}
                        height={533}
                        className="object-cover h-72 w-full"
                    />
                </Pages>

                {/* Main Content Pages */}
                {pagesData.map((pageData, pNum) => (
                    <Pages
                        key={pNum}
                        number={pNum + 1}
                        title={pageData.title}
                        content={pageData.content}
                        image={pageData.image}
                    />
                ))}

                {/* End Page */}
                <Pages>
                    <h1 className="text-4xl font-bold text-gray-800">The End</h1>
                    <p className="text-xl text-gray-600 mt-5">Thank you for flipping through!</p>
                    <Image
                        src="https://images.unsplash.com/photo-1459369510627-9efbee1e6051?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2slMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D"
                        alt="End Image"
                        width={800}
                        height={533}
                        className="object-cover h-72 w-full"
                    />
                </Pages>
            </HTMLFlipBook>
        </div>
    );
}

export default Flipbook;
