export default function LivePreviewWE({ component, containerClassName }) {
    return (
        <div>
            <h1>Visualização ao vivo</h1>
            <div className={containerClassName}>
                {component}
            </div>
        </div>
    )
}