const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

async function install() {
    const platform = os.platform();
    const arch = os.arch();

    console.log(`🚀 Installing Wave Terminal on ${platform} (${arch})...`);

    // Get the installation directory
    const installDir = process.env.WAVETERM_DIR || path.join(process.env.PINOKIO_ROOT, "repos", "waveterm");

    try {
        // Create installation directory if it doesn't exist
        if (!fs.existsSync(installDir)) {
            fs.mkdirSync(installDir, { recursive: true });
        }

        // Check if repository already exists
        const gitDir = path.join(installDir, ".git");
        if (!fs.existsSync(gitDir)) {
            console.log("📥 Cloning Wave Terminal repository...");
            execSync(`git clone https://github.com/Icarus-B4/waveterm.git "${installDir}"`, { stdio: "inherit" });
        } else {
            console.log("🔄 Repository already exists, pulling latest changes...");
            execSync("git pull", { cwd: installDir, stdio: "inherit" });
        }

        // Check and install Node.js dependencies
        console.log("📦 Installing Node.js dependencies...");
        execSync("yarn install", { cwd: installDir, stdio: "inherit" });

        // Check and install Go dependencies
        console.log("🔧 Installing Go dependencies...");
        execSync("go mod download", { cwd: installDir, stdio: "inherit" });

        // Initialize the project
        console.log("⚙️ Initializing project...");
        execSync("task init", { cwd: installDir, stdio: "inherit" });

        console.log("✅ Wave Terminal installation completed successfully!");
        console.log(`📁 Installation directory: ${installDir}`);
        console.log('🎉 You can now run Wave Terminal using the "start" script.');

        return {
            success: true,
            message: "Wave Terminal installed successfully",
            installDir: installDir,
        };
    } catch (error) {
        console.error("❌ Installation failed:", error.message);
        return {
            success: false,
            error: error.message,
        };
    }
}

// Export for Pinokio
if (typeof module !== "undefined" && module.exports) {
    module.exports = { install };
}

// Run if called directly
if (require.main === module) {
    install();
}
