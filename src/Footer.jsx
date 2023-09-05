import React from 'react'

function Footer(){
    return (
        <div className="footer">
            <div className="footer-content">
                <h2>Launching Knowledge Together!</h2>
                <img src="./src/assets/hand-mockup1.png"alt="hand holding phone" />
                <a href="https://api.whatsapp.com/send?text=Come and play CosmoTrivia Blast with me!" target="_blank" rel="noopener noreferrer">
        <button className="btn btn-secondary">Share on WhatsApp</button>
    </a>
            </div>
        </div>
    )
}

export default Footer