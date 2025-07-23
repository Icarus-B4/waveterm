const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

async function start() {
    const platform = os.platform();
    const arch = os.arch();

    console.log(`🚀 Starting Wave Terminal on ${platform} (${arch})...`);

    // Get the installation directory
    const installDir = process.env.WAVETERM_DIR || path.join(process.env.PINOKIO_ROOT, "repos", "waveterm");

    try {
        // Check if installation directory exists
        if (!fs.existsSync(installDir)) {
            throw new Error("Wave Terminal not installed. Please run install first.");
        }

        // Change to installation directory
        process.chdir(installDir);

        // Check if built executable exists
        const makeDir = path.join(installDir, "make");
        let executablePath = null;

        if (fs.existsSync(makeDir)) {
            const files = fs.readdirSync(makeDir);

            // Find the appropriate executable based on platform
            if (platform === "win32") {
                const exeFile = files.find((file) => file.endsWith(".exe"));
                if (exeFile) {
                    executablePath = path.join(makeDir, exeFile);
                }
            } else if (platform === "darwin") {
                const appFile = files.find((file) => file.endsWith(".app"));
                if (appFile) {
                    executablePath = path.join(makeDir, appFile);
                }
            } else if (platform === "linux") {
                const debFile = files.find((file) => file.endsWith(".deb"));
                const rpmFile = files.find((file) => file.endsWith(".rpm"));
                const snapFile = files.find((file) => file.endsWith(".snap"));

                if (debFile) {
                    console.log("📦 Installing .deb package...");
                    execSync(`sudo dpkg -i "${path.join(makeDir, debFile)}"`, { stdio: "inherit" });
                    console.log("✅ Wave Terminal installed successfully!");
                    console.log("🎉 You can now launch Wave Terminal from your applications menu.");
                    return { success: true, message: "Wave Terminal installed and ready to use" };
                } else if (rpmFile) {
                    console.log("📦 Installing .rpm package...");
                    execSync(`sudo rpm -i "${path.join(makeDir, rpmFile)}"`, { stdio: "inherit" });
                    console.log("✅ Wave Terminal installed successfully!");
                    console.log("🎉 You can now launch Wave Terminal from your applications menu.");
                    return { success: true, message: "Wave Terminal installed and ready to use" };
                } else if (snapFile) {
                    console.log("📦 Installing .snap package...");
                    execSync(`sudo snap install "${path.join(makeDir, snapFile)}" --dangerous`, { stdio: "inherit" });
                    console.log("✅ Wave Terminal installed successfully!");
                    console.log("🎉 You can now launch Wave Terminal from your applications menu.");
                    return { success: true, message: "Wave Terminal installed and ready to use" };
                }
            }
        }

        // If no built executable found, start in development mode
        if (!executablePath) {
            console.log("🔧 No built executable found, starting in development mode...");
            console.log("📝 Starting Wave Terminal development server...");

            // Start the development server
            const child = spawn("task", ["dev"], {
                cwd: installDir,
                stdio: "inherit",
                shell: true,
            });

            child.on("error", (error) => {
                console.error("❌ Failed to start Wave Terminal:", error.message);
            });

            child.on("close", (code) => {
                console.log(`Wave Terminal development server exited with code ${code}`);
            });

            return {
                success: true,
                message: "Wave Terminal development server started",
                pid: child.pid,
            };
        } else {
            // Launch the built executable
            console.log(`🎯 Launching Wave Terminal from: ${executablePath}`);

            const child = spawn(executablePath, [], {
                cwd: installDir,
                stdio: "inherit",
                shell: true,
            });

            child.on("error", (error) => {
                console.error("❌ Failed to start Wave Terminal:", error.message);
            });

            child.on("close", (code) => {
                console.log(`Wave Terminal exited with code ${code}`);
            });

            return {
                success: true,
                message: "Wave Terminal started successfully",
                executablePath: executablePath,
                pid: child.pid,
            };
        }
    } catch (error) {
        console.error("❌ Failed to start Wave Terminal:", error.message);
        return {
            success: false,
            error: error.message,
        };
    }
}

// Export for Pinokio
if (typeof module !== "undefined" && module.exports) {
    module.exports = { start };
}

// Run if called directly
if (require.main === module) {
    start();
}
