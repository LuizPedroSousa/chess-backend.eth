#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
  CREATE DATABASE chesseth;
  GRANT ALL PRIVILEGES ON DATABASE chesseth TO postgres;
EOSQL