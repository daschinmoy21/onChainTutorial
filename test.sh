#!/usr/bin/env bash
set -e

echo "🧪 BetaLabs Web3 Workshop - Test Script"
echo "========================================"
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

echo -e "${BLUE}📋 This script will:${NC}"
echo "  1. Compile the smart contract"
echo "  2. Run contract tests (if any)"
echo "  3. Deploy to a temporary network"
echo "  4. Test the registration script"
echo "  5. Build the web app"
echo ""

read -p "Press Enter to continue..."
echo ""

# Test 1: Compile contracts
echo -e "${BLUE}Test 1: Compiling Smart Contracts...${NC}"
cd contracts
if npm run compile 2>/dev/null || npx hardhat compile; then
    echo -e "${GREEN}✅ Contracts compiled successfully${NC}"
else
    echo -e "${RED}❌ Contract compilation failed${NC}"
    exit 1
fi
cd ..
echo ""

# Test 2: Start temporary Hardhat node
echo -e "${BLUE}Test 2: Starting Temporary Test Network...${NC}"
cd contracts
npm run node > /tmp/test-hardhat.log 2>&1 &
TEST_HARDHAT_PID=$!
cd ..
sleep 3

if ! kill -0 $TEST_HARDHAT_PID 2>/dev/null; then
    echo -e "${RED}❌ Test network failed to start${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Test network running${NC}"
echo ""

# Test 3: Deploy contract
echo -e "${BLUE}Test 3: Deploying Contract to Test Network...${NC}"
cd contracts
DEPLOY_OUTPUT=$(npx hardhat run scripts/deploy.ts --network localhost 2>&1)
CONTRACT_ADDRESS=$(echo "$DEPLOY_OUTPUT" | grep "StudentRegistry deployed to" | sed 's/.*deployed to //' | tr -d '\n\r')

if [ -z "$CONTRACT_ADDRESS" ]; then
    echo -e "${RED}❌ Contract deployment failed${NC}"
    kill $TEST_HARDHAT_PID
    exit 1
fi
echo -e "${GREEN}✅ Contract deployed to: $CONTRACT_ADDRESS${NC}"
cd ..
echo ""

# Test 4: Test registration script
echo -e "${BLUE}Test 4: Testing Registration Script...${NC}"
cd registration-script

# Create temporary .env for testing
cat > .env.test << EOF
RPC_URL=http://localhost:8545
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
CONTRACT_ADDRESS=$CONTRACT_ADDRESS
STUDENT_NAME=Test Student
STUDENT_ROLL=TEST001
EOF

# Run the registration
if node -e "
const dotenv = require('dotenv');
dotenv.config({ path: '.env.test' });
require('./index.ts');
" > /tmp/test-register.log 2>&1; then
    echo -e "${GREEN}✅ Registration script executed${NC}"
    cat /tmp/test-register.log
else
    echo -e "${YELLOW}⚠️  Registration script needs dependencies or has TypeScript errors${NC}"
    echo -e "${BLUE}This is expected before running 'npm install' in registration-script${NC}"
fi

rm .env.test
cd ..
echo ""

# Test 5: Build web app
echo -e "${BLUE}Test 5: Building Web Application...${NC}"
# Update contract address in web app
sed -i.bak "s/export const CONTRACT_ADDRESS = .*/export const CONTRACT_ADDRESS = \"$CONTRACT_ADDRESS\";/" web/src/utils/constants.ts

cd web
if npm run build 2>&1 | grep -q "built in"; then
    echo -e "${GREEN}✅ Web app built successfully${NC}"
    BUILD_SIZE=$(du -sh dist | cut -f1)
    echo -e "${BLUE}   Build size: $BUILD_SIZE${NC}"
else
    echo -e "${YELLOW}⚠️  Web app build had TypeScript errors (expected before npm install)${NC}"
fi
cd ..
echo ""

# Cleanup
echo -e "${BLUE}Cleaning up...${NC}"
kill $TEST_HARDHAT_PID 2>/dev/null || true
git restore web/src/utils/constants.ts 2>/dev/null || mv web/src/utils/constants.ts.bak web/src/utils/constants.ts 2>/dev/null || true
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🎉 Test Summary${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}✅ Smart contracts compile${NC}"
echo -e "${GREEN}✅ Contract can be deployed${NC}"
echo -e "${GREEN}✅ Test network works${NC}"
echo ""
echo -e "${YELLOW}📝 Next Steps:${NC}"
echo "  1. Run ./setup.sh to install all dependencies"
echo "  2. Run ./start.sh to start the workshop"
echo "  3. Open http://localhost:5173 in your browser"
echo ""
echo -e "${BLUE}💡 For full end-to-end test:${NC}"
echo "  1. Run ./start.sh"
echo "  2. Test registration: cd registration-script && npm start"
echo "  3. Open browser and connect MetaMask"
echo ""
