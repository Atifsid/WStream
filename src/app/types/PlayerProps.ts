import { FileBasedStream, HlsBasedStream } from "@movie-web/providers";

export interface PlayerProps {
    type: string;
    fileBasedStream?: FileBasedStream;
    hlsBasedStream?: HlsBasedStream;
}