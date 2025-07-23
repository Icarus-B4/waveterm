const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

async function build() {
    const platform = os.platform();
    const arch = os.arch();

    console.log(`🔨 Building Wave Terminal for ${platform} (${arch})...`);

    // Get the installation directory
    const installDir = process.env.WAVETERM_DIR || path.join(process.env.PINOKIO_ROOT, "repos", "waveterm");

    try {
        // Check if installation directory exists
        if (!fs.existsSync(installDir)) {
            throw new Error("Wave Terminal not installed. Please run install first.");
        }

        // Change to installation directory
        process.chdir(installDir);

        // Build the application
        console.log("🏗️ Building Wave Terminal...");

        // For production build and packaging
        console.log("📦 Creating production build...");
        execSync("task package", { stdio: "inherit" });

        // Check if build was successful
        const makeDir = path.join(installDir, "make");
        if (fs.existsSync(makeDir)) {
            const files = fs.readdirSync(makeDir);
            console.log("✅ Build completed successfully!");
            console.log("📁 Build artifacts:");
            files.forEach((file) => {
                console.log(`   - ${file}`);
            });

            return {
                success: true,
                message: "Wave Terminal built successfully",
                buildDir: makeDir,
                artifacts: files,
            };
        } else {
            throw new Error("Build artifacts not found");
        }
    } catch (error) {
        console.error("❌ Build failed:", error.message);
        return {
            success: false,
            error: error.message,
        };
    }
}

// Export for Pinokio
if (typeof module !== "undefined" && module.exports) {
    module.exports = { build };
}

// Run if called directly
if (require.main === module) {
    build();
}
