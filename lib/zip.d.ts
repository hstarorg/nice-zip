import * as JSZip from 'jszip';
/**
 * 压缩一个目录
 * @param folder
 * @param targetZipFileName
 * @param options
 * @returns
 */
export declare function zipFolder(folder: string, targetZipFileName: string, options?: JSZip.JSZipGeneratorOptions<'nodebuffer'>): Promise<boolean>;
/**
 * 压缩单个文件
 * @param sourceFileName
 * @param targetZipFileName
 * @param options
 */
export declare function zipFile(sourceFileName: string, targetZipFileName: string, options?: JSZip.JSZipGeneratorOptions<'nodebuffer'>): Promise<void>;
