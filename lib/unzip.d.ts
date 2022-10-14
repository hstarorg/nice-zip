import * as JSZip from 'jszip';
export declare type UnzipFileOptions = JSZip.JSZipLoadOptions & {
    onProcess?: (filePath: string, fileIdx: number, len: number) => void;
    onLoad?: (fileLen: number) => void;
};
/**
 * 解压指定文件到目标文件夹（文件夹必须存在）
 * @param <sourceFile> 源文件，必须是.zip后缀
 * @param [targetFolder] 解压路径，不提供则默认解压到当前路径
 * @param [options] 解压时的配置参数
 * @returns <Promise>
 */
export declare function unzipFile(sourceFile: string, targetFolder?: string, options?: UnzipFileOptions): Promise<boolean>;
