
import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

interface PagesProps {
    number: number;
    children: React.ReactNode;
}

// Page component for the flipbook
const Pages = React.forwardRef<HTMLDivElement, PagesProps>((props, ref) => {
    return (
        <div className="flex flex-col items-center justify-center bg-white shadow-lg min-h-full min-w-full" ref={ref}>
            <div>{props.children}</div>
            <p className="text-gray-600 text-sm mt-5">Page {props.number}</p>
        </div>
    );
});

Pages.displayName = 'Pages';

// Main Flipbook component
const Flipbook: React.FC = () => {
    const [numPages, setNumPages] = useState<number>(0); // Initialize with 0

    // Callback when the document is successfully loaded
    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    return (
        <div className="w-screen min-h-screen flex flex-col gap-5 justify-center items-center bg-gray-900 py-10">
            <h1 className="text-3xl text-white text-center font-bold mb-8">FlipBook</h1>

            {/* PDF Document and Flipbook */}
            <div className="bg-gray-200 shadow-2xl rounded-lg overflow-hidden">
                <Document file="/Object_Oriented_Programming.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                    <HTMLFlipBook
                        width={1000} // Adjust the width to fit two pages
                        height={800} // Set height for the pages
                        minWidth={800}
                        maxWidth={1600}
                        minHeight={500}
                        maxHeight={1000}
                        size="stretch"
                        maxShadowOpacity={0.5}
                        className="shadow-xl" // Add shadow for the flipbook
                        style={{ borderRadius: '10px' }} // Flipbook container style
                        startPage={0}
                        drawShadow={true} // Enable shadow for the flip effect
                        flippingTime={1000}
                        usePortrait={false} // Display two pages side by side
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
                        {
                            // Generate pages based on numPages
                            [...Array(numPages)].map((_, pNum) => (
                                <Pages key={pNum} number={pNum + 1}>
                                    <Page
                                        pageNumber={pNum + 1}
                                        width={550} // Adjust the width to fit two pages side by side
                                        renderAnnotationLayer={false}
                                        renderTextLayer={false}
                                    />
                                </Pages>
                            ))
                        }
                    </HTMLFlipBook>
                </Document>
            </div>

            {/* Additional Info or Controls */}
            <p className="text-gray-400 mt-6">Use arrows or swipe to flip pages.</p>
        </div>
    );
};

export default Flipbook;
