FROM python:3.7.4-buster

# install node
RUN apt-get update \
    && apt-get install -y curl gnupg \
    && rm -rf /var/lib/apt/lists/*
RUN curl -sL https://deb.nodesource.com/setup_10.x  | bash -
RUN apt-get -y install nodejs

# cp source code
COPY . /opt/store

# install node dependencies
WORKDIR /opt/store/src/ui
RUN npm install

# install python dependencies
#WORKDIR /opt/store/src/api
#RUN pip install
