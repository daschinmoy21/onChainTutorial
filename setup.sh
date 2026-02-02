#!/usr/bin/env bash
set -e

echo "🎓 BetaLabs Web3 Workshop - Setup Script"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${BLUE}📦 Installing Dependencies...${NC}"
echo ""

# Install contracts dependencies
echo -e "${YELLOW}→ Installing smart contract dependencies...${NC}"
cd contracts
npm install
cd ..

# Install web dependencies
echo -e "${YELLOW}→ Installing web app dependencies...${NC}"
cd web
npm install
cd ..

# Install registration script dependencies
echo -e "${YELLOW}→ Installing registration script dependencies...${NC}"
cd registration-script
npm install
cd ..

echo ""
echo -e "${GREEN}✅ All dependencies installed!${NC}"
echo ""
echo -e "${BLUE}📝 Next steps:${NC}"
echo "  1. Run: ./start.sh"
echo "  2. This will start Hardhat, deploy the contract, and start the web server"
echo ""
echo -e "${YELLOW}💡 Tip: Keep the terminal open to see logs${NC}"
