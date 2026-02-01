import { PDFDocument, degrees, rgb, StandardFonts } from "pdf-lib";

export function usePdfActions() {

    /**
     * Rotate pages by 90 degrees clockwise
     * @param fileBuffer The PDF file buffer
     * @param pageIndices Array of page indices to rotate (empty = all)
     * @param rotationDegrees Degrees to rotate (default 90)
     */
    const rotatePages = async (
        fileBuffer: ArrayBuffer,
        pageIndices: number[] = [],
        rotationDegrees: number = 90
    ): Promise<Uint8Array> => {
        const pdfDoc = await PDFDocument.load(fileBuffer);
        const pages = pdfDoc.getPages();

        pages.forEach((page, index) => {
            if (pageIndices.length === 0 || pageIndices.includes(index)) {
                const currentRotation = page.getRotation().angle;
                page.setRotation(degrees(currentRotation + rotationDegrees));
            }
        });

        return await pdfDoc.save();
    };

    /**
     * Remove specific pages from the PDF
     * @param fileBuffer The PDF file buffer
     * @param pageIndicesToRemove Array of page indices to DELETE
     */
    const removePages = async (
        fileBuffer: ArrayBuffer,
        pageIndicesToRemove: number[]
    ): Promise<Uint8Array> => {
        const pdfDoc = await PDFDocument.load(fileBuffer);
        const pageCount = pdfDoc.getPageCount();

        // We delete in reverse order to keep indices valid
        // Or we can just copy desired pages to a new doc
        const newPdf = await PDFDocument.create();
        const indicesToKeep = Array.from({ length: pageCount }, (_, i) => i)
            .filter(i => !pageIndicesToRemove.includes(i));

        const copiedPages = await newPdf.copyPages(pdfDoc, indicesToKeep);
        copiedPages.forEach(page => newPdf.addPage(page));

        return await newPdf.save();
    };

    /**
     * Reorder pages in the PDF
     * @param fileBuffer The PDF file buffer
     * @param newOrder Array of original page indices in the desired order
     */
    const organizePdf = async (
        fileBuffer: ArrayBuffer,
        newOrder: number[]
    ): Promise<Uint8Array> => {
        const pdfDoc = await PDFDocument.load(fileBuffer);
        const newPdf = await PDFDocument.create();

        const copiedPages = await newPdf.copyPages(pdfDoc, newOrder);
        copiedPages.forEach(page => newPdf.addPage(page));

        return await newPdf.save();
    };

    /**
     * Add watermark to all pages
     * @param fileBuffer The PDF file buffer
     * @param text Watermark text
     * @param colorHex Color in hex format (e.g. #FF0000)
     * @param opacity Opacity (0-1)
     */
    const watermarkPdf = async (
        fileBuffer: ArrayBuffer,
        text: string,
        colorHex: string = "#FF0000",
        opacity: number = 0.3
    ): Promise<Uint8Array> => {
        const pdfDoc = await PDFDocument.load(fileBuffer);
        const pages = pdfDoc.getPages();
        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        // Helper to convert hex to rgb
        const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16) / 255,
                g: parseInt(result[2], 16) / 255,
                b: parseInt(result[3], 16) / 255
            } : { r: 0, g: 0, b: 0 };
        };

        const { r, g, b } = hexToRgb(colorHex);

        pages.forEach(page => {
            const { width, height } = page.getSize();
            const fontSize = 50;
            const textWidth = font.widthOfTextAtSize(text, fontSize);
            const textHeight = font.heightAtSize(fontSize);

            page.drawText(text, {
                x: width / 2 - textWidth / 2,
                y: height / 2 - textHeight / 2,
                size: fontSize,
                font: font,
                color: rgb(r, g, b),
                opacity: opacity,
                rotate: degrees(45),
            });
        });

        return await pdfDoc.save();
    };

    /**
    * Add page numbers to all pages
    * @param fileBuffer The PDF file buffer
    * @param position 'bottom-center' | 'bottom-right'
    */
    const addPageNumbers = async (
        fileBuffer: ArrayBuffer,
        position: 'bottom-center' | 'bottom-right' = 'bottom-center'
    ): Promise<Uint8Array> => {
        const pdfDoc = await PDFDocument.load(fileBuffer);
        const pages = pdfDoc.getPages();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const pageCount = pdfDoc.getPageCount();

        pages.forEach((page, index) => {
            const { width } = page.getSize();
            const text = `${index + 1} / ${pageCount}`;
            const fontSize = 12;
            const textWidth = font.widthOfTextAtSize(text, fontSize);

            let x = width / 2 - textWidth / 2;
            if (position === 'bottom-right') {
                x = width - textWidth - 20;
            }

            page.drawText(text, {
                x: x,
                y: 20,
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
        });

        return await pdfDoc.save();
    };

    return {
        rotatePages,
        removePages,
        organizePdf,
        watermarkPdf,
        addPageNumbers
    };
}
