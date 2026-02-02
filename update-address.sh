#!/usr/bin/env bash

echo "🔧 Update Contract Address"
echo "=========================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Get current contract address if exists
CURRENT_ADDRESS=""
if [ -f "web/src/utils/constants.ts" ]; then
    CURRENT_ADDRESS=$(grep "CONTRACT_ADDRESS" web/src/utils/constants.ts | grep -o "0x[a-fA-F0-9]\{40\}" | head -1)
fi

if [ ! -z "$CURRENT_ADDRESS" ]; then
    echo -e "${BLUE}Current contract address: ${CURRENT_ADDRESS}${NC}"
    echo ""
fi

# Prompt for new address
read -p "Enter new contract address (0x...): " NEW_ADDRESS

# Validate address format
if [[ ! $NEW_ADDRESS =~ ^0x[a-fA-F0-9]{40}$ ]]; then
    echo -e "${RED}❌ Invalid address format!${NC}"
    echo "Address should be 42 characters starting with 0x"
    exit 1
fi

echo ""
echo -e "${BLUE}Updating configuration files...${NC}"

# Update web app constants.ts
if [ -f "web/src/utils/constants.ts" ]; then
    sed -i.bak "s|export const CONTRACT_ADDRESS = .*|export const CONTRACT_ADDRESS = \"$NEW_ADDRESS\"; // Updated manually|" web/src/utils/constants.ts
    echo -e "${GREEN}✓ Updated web/src/utils/constants.ts${NC}"
fi

# Update registration script .env
if [ -f "registration-script/.env" ]; then
    sed -i.bak "s|CONTRACT_ADDRESS=.*|CONTRACT_ADDRESS=$NEW_ADDRESS|" registration-script/.env
    echo -e "${GREEN}✓ Updated registration-script/.env${NC}"
else
    # Create .env if it doesn't exist
    cat > registration-script/.env << EOF
RPC_URL=http://localhost:8545
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
CONTRACT_ADDRESS=$NEW_ADDRESS

STUDENT_NAME=John Doe
STUDENT_ROLL=CS2024001
EOF
    echo -e "${GREEN}✓ Created registration-script/.env${NC}"
fi

# Update .env.example
if [ -f "registration-script/.env.example" ]; then
    sed -i.bak "s|CONTRACT_ADDRESS=.*|CONTRACT_ADDRESS=$NEW_ADDRESS|" registration-script/.env.example
    echo -e "${GREEN}✓ Updated registration-script/.env.example${NC}"
fi

# Update config file
echo "EXISTING_CONTRACT_ADDRESS=$NEW_ADDRESS" > .workshop-config
echo -e "${GREEN}✓ Updated .workshop-config${NC}"

echo ""
echo -e "${GREEN}✅ Contract address updated successfully!${NC}"
echo ""
echo -e "${YELLOW}New address: ${NEW_ADDRESS}${NC}"
echo ""
echo -e "${BLUE}💡 Next steps:${NC}"
echo "  - If the web server is running, restart it to see changes"
echo "  - The registration script will use the new address automatically"
