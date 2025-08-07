function LoadingStatus({theme}) {
    return <div className="loading-container">
        <h2>Generating Your {theme} Story</h2>

        <div className="loading-animation">
            <div className="spinner"></div>
        </div>

        <div className="loading-info">
            Please wait why we generate your story...
        </div>
    </div>
}

export default LoadingStatus