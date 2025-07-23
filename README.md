<p align="center">
  <a href="https://www.waveterm.dev">
	<picture>
		<source media="(prefers-color-scheme: dark)" srcset="./assets/wave-dark.png">
		<source media="(prefers-color-scheme: light)" srcset="./assets/wave-light.png">
		<img alt="Wave Terminal Logo" src="./assets/wave-light.png" width="240">
	</picture>
  </a>
  <br/>
</p>

# Wave Terminal Pinokio Script

Dieses Pinokio-Script ermöglicht die einfache Installation und Ausführung von Wave Terminal mit einem Klick.

## Was ist Wave Terminal?

Wave Terminal ist ein Open-Source Terminal, das traditionelle Terminal-Funktionen mit grafischen Fähigkeiten wie Dateivorschau, Webbrowsing und KI-Unterstützung kombiniert. Es läuft auf macOS, Linux und Windows.

## Features

- **Flexible Drag & Drop Oberfläche** für die Organisation von Terminal-Blöcken, Editoren, Webbrowsern und KI-Assistenten
- **Integrierter Editor** für nahtloses Bearbeiten von Remote-Dateien mit Syntax-Highlighting
- **Reiche Dateivorschau** für Remote-Dateien (Markdown, Bilder, Video, PDFs, CSVs, Verzeichnisse)
- **Integrierter KI-Chat** mit Unterstützung für mehrere Modelle (OpenAI, Claude, Azure, Perplexity, Ollama)
- **Command Blocks** für die Isolierung und Überwachung einzelner Befehle
- **One-Click Remote-Verbindungen** mit vollständigem Terminal- und Dateisystemzugriff

## Installation

### Voraussetzungen

Bevor du das Script verwendest, stelle sicher, dass folgende Abhängigkeiten installiert sind:

- **Node.js 22 LTS** oder höher
- **Go 1.21** oder höher
- **Task** (Task Runner)
- **Git**

### Installation der Abhängigkeiten

#### Windows

```powershell
# Node.js von https://nodejs.org/
# Go von https://go.dev/
# Task von https://taskfile.dev/installation/
```

#### macOS

```bash
# Mit Homebrew
brew install node go task

# Oder mit MacPorts
sudo port install nodejs go task
```

#### Linux

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install golang-go
sudo snap install task --classic

# Fedora/RHEL
sudo dnf install nodejs go task

# Arch
sudo pacman -S nodejs go task
```

## Verwendung

### 1. Installation

Führe das Install-Script aus, um Wave Terminal zu klonen und alle Abhängigkeiten zu installieren:

```bash
node install.js
```

### 2. Build (Optional)

Erstelle eine ausführbare Version von Wave Terminal:

```bash
node build.js
```

### 3. Start

Starte Wave Terminal:

```bash
# Für Production-Build (falls verfügbar)
node start.js

# Für Development-Modus mit Hot Reload
node dev.js
```

## Script-Funktionen

### install.js

- Klont das Wave Terminal Repository
- Installiert Node.js und Go Abhängigkeiten
- Initialisiert das Projekt

### build.js

- Erstellt eine Production-Build von Wave Terminal
- Generiert ausführbare Dateien für deine Plattform
- Speichert Build-Artefakte im `make/` Verzeichnis

### start.js

- Startet Wave Terminal
- Erkennt automatisch, ob ein Production-Build verfügbar ist
- Fällt auf Development-Modus zurück, falls kein Build vorhanden ist
- Installiert automatisch Pakete auf Linux-Systemen

### dev.js

- Startet Wave Terminal im Development-Modus
- Aktiviert Hot Module Reloading
- Zeigt Live-Logs an

## Plattform-Unterstützung

- **Windows**: .exe Dateien
- **macOS**: .app Bundle
- **Linux**: .deb, .rpm, oder .snap Pakete

## Troubleshooting

### Häufige Probleme

1. **"Wave Terminal not installed"**

   - Führe zuerst `node install.js` aus

2. **Build-Fehler**

   - Stelle sicher, dass alle Abhängigkeiten installiert sind
   - Überprüfe die Go und Node.js Versionen

3. **Permission-Fehler auf Linux**
   - Verwende `sudo` für Paket-Installationen

### Logs

- Development-Logs werden in der Konsole angezeigt
- Backend-Logs findest du unter `~/.waveterm-dev/waveapp.log`

## Links

- [Wave Terminal Homepage](https://waveterm.dev)
- [Dokumentation](https://docs.waveterm.dev)
- [GitHub Repository](https://github.com/Icarus-B4/waveterm)
- [Discord Community](https://discord.gg/XfvZ334gwU)

## Lizenz

Wave Terminal ist unter der Apache-2.0 Lizenz lizenziert.
