import React from "react";
import '../css/Statistics.css'

export default function Statistics({ stats }) {

    return (
        <div className="statsBody">
            <div className="statsDiv">
                <h2>Average time to finish tasks:</h2>
                <p>{Math.floor((stats['total'] / 60))}:{stats['total'] % 60} minutes</p>
            </div>
            <div className="statsDiv">
                <h2>Average time to finish tasks by priority:</h2>
                <p>Low: {Math.floor((stats['low'] / 60))}:{stats['low'] % 60} minutes</p>
                <p>Medium: {Math.floor((stats['medium'] / 60))}:{stats['medium'] % 60} minutes</p>
                <p>High: {Math.floor((stats['high'] / 60))}:{stats['high'] % 60} minutes</p>
            </div>
        </div>
    );
}