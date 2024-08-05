import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as admin from 'firebase-admin';
import { UploadMetadata, getDownloadURL, getStorage, ref, uploadBytes } from '@firebase/storage';
import { firebaseApp } from 'src/config/firebase.config';
import { v4 as uuidv4 } from 'uuid'; 

@Injectable()
export class ResumeService {
  
    async processTextToPdfAndUpload(text: string): Promise<{ fileUrl: string }> {
        const pdfBuffer = await this.createPdfBuffer(text);
        return this.uploadPDF(pdfBuffer);
      }
    
      private createPdfBuffer(text: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
          const doc = new PDFDocument();
          const buffers: Buffer[] = [];
          doc.on('data', buffers.push.bind(buffers));
          doc.on('end', () => {
            resolve(Buffer.concat(buffers));
          });
          doc.on('error', (err) => reject(err));
    
          // Add text to the document
          doc.fontSize(12).text(text, {
            align: 'justify'
          });
          doc.end();
        });
      }
    
      private async uploadPDF(pdfBuffer: Buffer): Promise<{ fileUrl: string }> {
        try {
          const storage = getStorage(firebaseApp);
          const storageRef = ref(storage, `pdfs/${uuidv4()}.pdf`);
    
          const metadata: UploadMetadata = {
            contentType: 'application/pdf',
          };
    
          await uploadBytes(storageRef, pdfBuffer, metadata);
    
          const fileUrl = await getDownloadURL(storageRef);
          return { fileUrl };
        } catch (error) {
          console.error('Error uploading PDF:', error);
          throw new Error('Failed to upload PDF');
        }
      }
}
