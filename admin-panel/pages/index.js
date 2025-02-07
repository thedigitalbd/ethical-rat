import { useEffect, useState } from "react";
import socket from "../utils/socket";

export default function Dashboard() {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        fetch("/api/devices")
            .then((res) => res.json())
            .then((data) => setDevices(data));

        socket.on("device_update", (device) => {
            setDevices((prev) => prev.map((d) => (d.deviceId === device.deviceId ? device : d)));
        });
    }, []);

    return (
        <div>
            <h1>Connected Devices</h1>
            <ul>
                {devices.map((device) => (
                    <li key={device.deviceId}>{device.deviceId} - {device.status}</li>
                ))}
            </ul>
        </div>
    );
}
