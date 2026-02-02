{
  description = "Blockchain Workshop - On-Chain Tutorial Development Environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        
        # Node.js version to use across all components
        nodejs = pkgs.nodejs_20;
        
        # Common build inputs for all Node.js projects
        commonBuildInputs = with pkgs; [
          nodejs
          nodePackages.npm
          nodePackages.pnpm
          nodePackages.yarn
        ];

        # Development tools
        devTools = with pkgs; [
          git
          nodePackages.typescript
          # ts-node removed - Node.js 22.6+ has built-in TypeScript support
        ];

      in
      {
        # Default development shell with everything
        devShells.default = pkgs.mkShell {
          buildInputs = commonBuildInputs ++ devTools;

          shellHook = ''
            echo "🚀 Blockchain Workshop Development Environment"
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            echo "📦 Node.js: $(node --version)"
            echo "📦 npm: $(npm --version)"
            echo ""
            echo "Project Structure:"
            echo "  📁 contracts/          - Hardhat smart contracts"
            echo "  📁 web/                - Vite + React + TypeScript UI"
            echo "  📁 registration-script/ - TypeScript registration script"
            echo ""
            echo "Quick Start:"
            echo "  1. Contracts:  cd contracts && npm install && npm run node"
            echo "  2. Web UI:     cd web && npm install && npm run dev"
            echo "  3. Script:     cd registration-script && npm install && npm start"
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
          '';
        };

        # Specialized shell for contract development
        devShells.contracts = pkgs.mkShell {
          buildInputs = commonBuildInputs ++ devTools;
          
          shellHook = ''
            echo "⚡ Hardhat Contracts Development Shell"
            cd contracts 2>/dev/null || echo "Run from project root or 'cd contracts' manually"
          '';
        };

        # Specialized shell for web development
        devShells.web = pkgs.mkShell {
          buildInputs = commonBuildInputs ++ devTools;
          
          shellHook = ''
            echo "🌐 Web UI Development Shell"
            cd web 2>/dev/null || echo "Run from project root or 'cd web' manually"
          '';
        };

        # Specialized shell for registration script
        devShells.script = pkgs.mkShell {
          buildInputs = commonBuildInputs ++ devTools;
          
          shellHook = ''
            echo "📝 Registration Script Development Shell"
            cd registration-script 2>/dev/null || echo "Run from project root or 'cd registration-script' manually"
          '';
        };

        # Package outputs for contracts
        packages.contracts = pkgs.stdenv.mkDerivation {
          name = "workshop-chain";
          src = ./contracts;
          
          buildInputs = commonBuildInputs;
          
          buildPhase = ''
            export HOME=$TMPDIR
            npm ci --cache $TMPDIR/.npm
            npm run test || true
          '';
          
          installPhase = ''
            mkdir -p $out
            cp -r . $out/
          '';
        };

        # Package output for web
        packages.web = pkgs.stdenv.mkDerivation {
          name = "workshop-web";
          src = ./web;
          
          buildInputs = commonBuildInputs;
          
          buildPhase = ''
            export HOME=$TMPDIR
            npm ci --cache $TMPDIR/.npm
            npm run build
          '';
          
          installPhase = ''
            mkdir -p $out
            cp -r dist $out/
          '';
        };

        # Default package
        packages.default = self.packages.${system}.web;
      }
    );
}
