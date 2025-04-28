import { useState, useEffect } from "react";

export const Countdown = ({ targetTimestamp }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const [countdownColor, setCountdownColor] = useState("text-green-500"); // Colore iniziale

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = Date.now() / 1000; // Ottieni il tempo attuale in secondi
            const remainingTime = targetTimestamp - currentTime; // Calcola la differenza in secondi

            if (remainingTime <= 0) {
                clearInterval(interval); // Se il countdown è finito, fermiamo l'intervallo
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(remainingTime / (24 * 3600)); // Calcola giorni
                const hours = Math.floor((remainingTime % (24 * 3600)) / 3600); // Calcola ore
                const minutes = Math.floor((remainingTime % 3600) / 60); // Calcola minuti
                const seconds = Math.floor(remainingTime % 60); // Calcola secondi

                setTimeLeft({ days, hours, minutes, seconds });

                // Aggiorna il colore del countdown in base al tempo rimanente
                if (remainingTime > 24 * 3600) {
                    setCountdownColor("text-green-500"); // Verde per più di un giorno
                } else if (remainingTime <= 24 * 3600 && remainingTime > 3600) {
                    setCountdownColor("text-yellow-500"); // Giallo da meno di 24h a 1h
                } else if (remainingTime <= 3600) {
                    setCountdownColor("text-red-500"); // Rosso da meno di 1h
                }
            }
        }, 1000); // Aggiorna ogni secondo

        return () => clearInterval(interval); // Pulisce l'intervallo quando il componente viene smontato
    }, [targetTimestamp]);

    return (
        <div className={`countdown ${countdownColor} font-bold`}>
            <p>
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </p>
        </div>
    );
};
