#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
  CREATE DATABASE bots_platform;
  GRANT ALL PRIVILEGES ON DATABASE bots_platform TO postgres;
EOSQL