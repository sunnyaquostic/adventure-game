import { useState } from "react";

const ThemeInput = ({onSubmit}) => {
    const [theme, setTheme] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!theme.trim()) {
            setError("Please enter a theme name")
            return 
        }

        onSubmit(theme)
    }

    return <div className="theme-input-container">
        <h2>Generate Your Adventure</h2>
        <p>Enter a theme for your interractive story</p>

        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <input 
                    type="text" 
                    name="theme" 
                    id="theme"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    placeholder="Enter a theme (like pirates ...)"
                    className={error ? 'error' : ""} 
                />
                {error && <p className="error-message">{error}</p>}
            </div>

            <button type="submit" className="generate-btn">Generate Story</button>
        </form>
    </div>
}

export default ThemeInput