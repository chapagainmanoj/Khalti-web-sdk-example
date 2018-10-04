#!/usr/bin/env bash
DIRECTORY=virtualenvs/.flask
deactivate 2> /dev/null
if [ -d "${DIRECTORY}" ]; then
    source ${DIRECTORY}/bin/activate
else
    virtualenv -p `which python3` ${DIRECTORY}
    source ${DIRECTORY}/bin/activate
fi


# load environment
export $(cat .env | grep -v ^# | xargs)
