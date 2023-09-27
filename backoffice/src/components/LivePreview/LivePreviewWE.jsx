export default function LivePreviewWE({ component, containerClassName }) {
    return (
        <div>
            <h1>Live Preview</h1>
            <div className={containerClassName}>
                {component}
            </div>
        </div>
    )
}