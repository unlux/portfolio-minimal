{
  # https://github.com/VanCoding/nix-prisma-utils
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    prisma-utils.url = "github:VanCoding/nix-prisma-utils";
  };

  outputs = {
    nixpkgs,
    prisma-utils,
    ...
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
    prisma =
      (prisma-utils.lib.prisma-factory {
        inherit pkgs;
        # just copy these hashes for now, and then change them when nix complains about the mismatch
        prisma-fmt-hash = "sha256-rVMU9a9B3TsjbkQDts41QNPcC4kc7h+01VG3vKqvXWE=";
        query-engine-hash = "sha256-zd3Afzhaq0cmq4FJKoQihx/z7R2IuEy7Mp9jtjUfzkM=";
        libquery-engine-hash = "sha256-+VmrYx+6qGryQyJp7eVcUZfGBN4SHJGgZebePTNbmN0=";
        schema-engine-hash = "sha256-1kUc/bvGKQAUtL6T/qStfQ7/LKjDICdrlCxWVpqTxnk=";
      }).fromNpmLock
      ./package-lock.json; # <--- path to our package-lock.json file that contains the version of prisma-engines
  in {
    devShells.${system}.default = pkgs.mkShell {
      buildInputs = with pkgs; [
        openssl
      ];
      inherit (prisma) env;
      # or, you can use `shellHook` instead of `env` to load the same environment variables.
      # shellHook = prisma.shellHook;
    };
  };
}
