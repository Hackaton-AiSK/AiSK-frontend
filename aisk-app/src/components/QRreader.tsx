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

    // Access pop up
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Success
    const onScanSuccess = (result: QrScanner.ScanResult) => {
        console.log(result);
        setScannedResult(result.data);
        setIsModalOpen(true);
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

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openUrl = () => {
        if (scannedResult) {
            window.open(scannedResult, "_blank");
        }
    };

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

            {isModalOpen && scannedResult && (
                <div className="modal">
                    <div className="modal-content">
                        <p>주소: {scannedResult}</p>
                        <button onClick={openUrl}>바로가기</button>
                        <button onClick={closeModal}>취소하기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QRreader;
