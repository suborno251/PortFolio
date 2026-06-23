
export default function Projects() {

    const projects = [
        {
            badge: "AI · Full-Stack",
            name: "ZEFA AI Image",
            desc: "Gen-AI fashion model image generation pipeline. Real-time streaming with SSE, AWS S3 asset management, canvas-based watermarking, and a gallery UI with pagination.",
            stack: ["Node.js", "TypeScript", "Gemini API", "AWS S3", "SSE", "jQuery"],
        },
        {
            badge: "Backend · DevOps",
            name: "Camera Dashboard",
            desc: "Multi-camera live monitoring system with a Dockerised backend and real-time frontend.",
            stack: ["Node.js", "Docker", "PostgreSQL", "HTML/CSS"],
        },
        {
            badge: "Laravel · Frontend",
            name: "Barcode Scanner UI",
            desc: "Product lookup and inventory tool for ZEFA Internationals with barcode input and camera scan.",
            stack: ["Laravel", "PHP", "jQuery", "Bootstrap"],
        },
        {
            badge: "React · Laravel",
            name: "CigaretteLens",
            desc: "A niche review platform for cigarettes — inspired by Letterboxd. Full community feature set: ratings, reviews, want-to-try lists, and brand discovery.",
            stack: ["Laravel", "React", "Vite", "Tailwind"],
        },
    ];
    return (
        <div className="project-grid">
            {projects.map((project, i) => (
                <div className="project-card reveal" key={i}>
                    <div className="project-header">
                        <span className="project-badge">{project.badge}</span>
                    </div>
                    <div className="project-name">{project.name}</div>
                    <p className="project-desc">
                        {project.desc}
                    </p>
                    <div className="stack-chips">
                        {project.stack.map((stacks, j) => (
                            <span className="chip" key={j}>{stacks}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}