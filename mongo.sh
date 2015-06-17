#! /bin/bash

echo Starting db...
cd c:/temp/jcar/MongoDB/Server/3.0/bin &&  ./mongod --dbpath ../../../data/db/ $*