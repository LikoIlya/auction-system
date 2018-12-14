#!/usr/bin/env bash
docker-compose -f docker-compose.yml -f docker-compose.test.yml down && docker-compose -f docker-compose.yml -f docker-compose.test.yml up --exit-code-from api-tests --abort-on-container-exit
