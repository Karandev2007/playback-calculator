"use client";

import { useState } from 'react';

export default function Home() {
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    const [speed, setSpeed] = useState('');
    const [calculatedTime, setCalculatedTime] = useState('');
    const [timeSaved, setTimeSaved] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!speed) {
            setError('enter a playback speed!');
            return;
        }

        // Seriously, why are you leaving this blank??
        if (hours === '' && minutes === '' && seconds === '') {
            setError('no time entered? Fill something in!');
            return;
        }

        if (Number(speed) <= 0) {
            setError('Speed’s gotta be positive, buddy!');
            return;
        }

        setError('');

        // Adding default 0 if missing values (cuz why not?)
        let totalSeconds = (Number(hours) || 0) * 3600 + (Number(minutes) || 0) * 60 + (Number(seconds) || 0);

        if (totalSeconds === 0) {
            setError('Total time can’t be zero! What are you calculating, even??');
            return;
        }

        let newTime = totalSeconds / Number(speed);
        let savedTime = totalSeconds - newTime;

        const formatTime = (time) => {
            let hrs = Math.floor(time / 3600);
            let mins = Math.floor((time % 3600) / 60);
            let secs = Math.floor(time % 60);
            return `${hrs}h ${mins}m ${secs}s`; // Basic time formatting, simple and sweet
        };

        setCalculatedTime(formatTime(newTime)); // Save that new time
        setTimeSaved(formatTime(savedTime)); // Calculate how much time you saved
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-center text-white">Playback Speed Calculator</h1>

                {error && <p className="text-red-400 text-center mb-4">{error}</p>} {/* Oops, error handling time */}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* hours, minutes, seconds section */}
                    <div className="flex gap-4 justify-center">
                        <input 
                            type="number"
                            placeholder="4"
                            value={hours} 
                            onChange={(e) => setHours(e.target.value)}
                            className="w-1/3 p-2 border border-gray-600 bg-gray-700 text-white rounded-lg"
                        />
                        <input 
                            type="number" 
                            placeholder="52"
                            value={minutes}
                            onChange={(e) => setMinutes(e.target.value)}
                            className="w-1/3 p-2 border border-gray-600 bg-gray-700 text-white rounded-lg"
                        />
                        <input 
                            type="number"
                            placeholder="34"
                            value={seconds}
                            onChange={(e) => setSeconds(e.target.value)}
                            className="w-1/3 p-2 border border-gray-600 bg-gray-700 text-white rounded-lg"
                        />
                    </div>

                    {/* playback speed */}
                    <div>
                        <input 
                            type="number" 
                            placeholder="2" 
                            value={speed} 
                            onChange={(e) => setSpeed(e.target.value)} 
                            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-lg" 
                        />
                    </div>

                    {/* submit button */}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                        Calculate
                    </button>
                </form>

                {/* results section */}
                {calculatedTime && (
                    <div className="mt-6 text-center text-lg">
                        <p className="text-green-400 font-bold">Calculated Time: {calculatedTime}</p>
                        <p className="text-blue-400 font-bold">Time Saved: {timeSaved}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
