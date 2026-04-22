<p align="center">
  <img src="icon.png" alt="Project Logo" width="21%">
</p>

# Fedimint Gateway for StartOS

This project packages Fedimint Gateway for StartOS.

The Gateway enables Lightning Network payments for Fedimint federations. It can run with an integrated LDK node, or connect to an external LND node installed from the Start9 marketplace. For Bitcoin data, it can use Bitcoin Core (recommended) or an Esplora API endpoint.

## Dependencies

These steps were run on Ubuntu 24.04.

Install the system dependencies below to build this project by following the instructions in the provided links. You can find instructions on how to set up the appropriate build environment in the [Developer Docs](https://docs.start9.com/latest/developer-docs/packaging).

- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [Node.js & npm](https://nodejs.org/)
- [make](https://www.gnu.org/software/make/)
- [start-cli](https://github.com/Start9Labs/start-os/tree/sdk/)

## Build environment

Prepare your StartOS build environment.

1. Install docker
```
curl -fsSL https://get.docker.com | bash
sudo usermod -aG docker "$USER"
exec sudo su -l $USER
```
2. Set buildx as the default builder
```
docker buildx install
docker buildx create --use
```
3. Enable cross-arch emulated builds in docker
```
docker run --privileged --rm linuxkit/binfmt:v0.8
```
4. Install Node.js (v22+)
```
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```
5. Install essentials build packages
```
sudo apt-get install -y build-essential openssl libssl-dev libc6-dev clang libclang-dev ca-certificates
```
6. Install Rust
```
curl https://sh.rustup.rs -sSf | sh
# Choose nr 1 (default install)
source $HOME/.cargo/env
```
7. Build and install start-cli
```
git clone https://github.com/Start9Labs/start-os.git && \
 cd start-os && git submodule update --init --recursive && \
 make sdk
```
Initialize sdk & verify install
```
start-cli init-key
start-cli --version
```
Now you are ready to build the `fedimint-gatewayd` package!

## Cloning

Clone the project locally:

```
git clone https://github.com/Start9Labs/gatewayd-startos.git
cd gatewayd-startos
```

## Building

Install npm dependencies:

```
npm install
```

To build the `fedimint-gatewayd` package for all platforms, run:

```
make
```

To build for a single platform:

```
# for amd64
make x86

# for arm64
make arm
```

## Installing (on StartOS)

Run the following commands to determine successful install:
> :information_source: Change server-name.local to your Start9 server address

```
start-cli auth login
# Enter your StartOS password
start-cli --host https://server-name.local package install fedimint-gatewayd.s9pk
```

If you already have your `start-cli` config file setup with a default `host`, you can install simply by running:

```
make install
```

> **Tip:** You can also install the fedimint-gatewayd.s9pk using **Sideload Service** under the **System > Manage** section.

### Verify Install

Go to your StartOS Services page, select **Fedimint Gateway**, open the **Configuration** action to set your Lightning backend, Bitcoin backend, and admin password, then start the service. Verify the gateway dashboard is accessible on the exposed interface.

**Done!**
