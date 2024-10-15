# backend-server

The WIP backend for Wasona. Uses Express + Postgres. Currently implementing auth. 

## Requirements

* Yarn (>= 1.22)

* Postgres

## Installation

```
git clone https://github.com/wasona/backend-server
mv sample.env .env  # And populate it with real authorisation
yarn run build
```

## Usage
```
yarn run dev
```
Setting up a systemd service, docker etc is up to you.

# License

backend-server is licensed under the GNU Affero General Public License Version 3.
