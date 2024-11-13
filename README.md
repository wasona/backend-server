# backend-server

The WIP backend for Wasona. Uses Express, pg-promise, and Postgres. Currently mostly done with auth, and implementing application logic. 

## Requirements

* Yarn (>= 4.5.1)

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
