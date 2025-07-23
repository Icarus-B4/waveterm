const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

async function dev() {
    const platform = os.platform();
    const arch = os.arch();

    console.log(`🔧 Starting Wave Terminal in development mode on ${platform} (${arch})...`);

    // Get the installation directory
    const installDir = process.env.WAVETERM_DIR || path.join(process.env.PINOKIO_ROOT, "repos", "waveterm");

    try {
        // Check if installation directory exists
        if (!fs.existsSync(installDir)) {
            throw new Error("Wave Terminal not installed. Please run install first.");
        }

        // Change to installation directory
        process.chdir(installDir);

        console.log("🚀 Starting Wave Terminal development server with hot reload...");
        console.log("📝 This will start the Electron app via Vite dev server");
        console.log("🔄 Changes to the code will automatically reload the application");

        // Start the development server
        const child = spawn("task", ["dev"], {
            cwd: installDir,
            stdio: "inherit",
            shell: true,
            env: {
                ...process.env,
                WCLOUD_ENDPOINT: "https://api-dev.waveterm.dev/central",
                WCLOUD_WS_ENDPOINT: "wss://wsapi-dev.waveterm.dev/",
            },
        });

        child.on("error", (error) => {
            console.error("❌ Failed to start Wave Terminal development server:", error.message);
        });

        child.on("close", (code) => {
            console.log(`Wave Terminal development server exited with code ${code}`);
        });

        // Handle process termination
        process.on("SIGINT", () => {
            console.log("\n🛑 Stopping Wave Terminal development server...");
            child.kill("SIGINT");
        });

        process.on("SIGTERM", () => {
            console.log("\n🛑 Stopping Wave Terminal development server...");
            child.kill("SIGTERM");
        });

        return {
            success: true,
            message: "Wave Terminal development server started with hot reload",
            pid: child.pid,
            note: "Press Ctrl+C to stop the development server",
        };
    } catch (error) {
        console.error("❌ Failed to start Wave Terminal development server:", error.message);
        return {
            success: false,
            error: error.message,
        };
    }
}

// Export for Pinokio
if (typeof module !== "undefined" && module.exports) {
    module.exports = { dev };
}

// Run if called directly
if (require.main === module) {
    dev();
}
