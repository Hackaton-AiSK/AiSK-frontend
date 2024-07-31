import React, { useEffect, useRef, useState } from "react";
import "../css/QRreader.scss";
import QrScanner from "qr-scanner";
import QrFrame from "../assets/images/qr-frame.svg";

const QRreader: React.FC = () => {
    // QR States
    const scanner = useRef<QrScanner | null>(null);
    const videoEl = useRef<HTMLVideoElement | null>(null);
    const qrBoxEl = useRef<HTMLDivElement | null>(null);
    const [qrOn, setQrOn] = useState<boolean>(true);

    // Result
    const [scannedResult, setScannedResult] = useState<string | undefined>("");

    // Success
    const onScanSuccess = (result: QrScanner.ScanResult) => {
        console.log(result);
        setScannedResult(result.data);
    };

    // Fail
    const onScanFail = (err: string | Error) => {
        console.log(err);
    };

    useEffect(() => {
        if (videoEl.current && !scanner.current) {
            scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
                onDecodeError: onScanFail,
                preferredCamera: "environment",
                highlightScanRegion: true,
                highlightCodeOutline: true,
                overlay: qrBoxEl.current || undefined,
            });
            scanner.current.start()
                .then(() => setQrOn(true))
                .catch((err) => {
                    console.error(err);
                    if (err) setQrOn(false);
                });
        }

        return () => {
            if (!videoEl?.current) {
                scanner?.current?.stop();
              }
        };
    }, []);

    useEffect(() => {
        if (!qrOn) {
            alert("Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.");
        }
    }, [qrOn]);

    return (
        <div className="qr-reader">
            {/* QR */}
            <video ref={videoEl}></video>
            <div ref={qrBoxEl} className="qr-box">
                <img
                    src={QrFrame}
                    alt="Qr Frame"
                    width={256}
                    height={256}
                    className="qr-frame"
                />
            </div>

            {/* Show Data Result if scan is successful */}
            {scannedResult && (
                <p style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 99999,
                    color: "white",
                }}>
                    Scanned Result: {scannedResult}
                </p>
            )}
        </div>
    );
};

export default QRreader;
