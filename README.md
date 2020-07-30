# codify-indi-assignment
The assignment given to me while appearing for interview at Codify Indi

## Pre-requisites

- Node (v12.18.1 or above)

## Installation

### Clone the project using git:

```
git clone https://github.com/iamprathamesh/codify-indi-assignment.git
```

```
cd codify-indi-assignment
```

### Install the required npm packages:

```
npm install
```

### Start the application:

```
node server.js
```

default port is 3000, you can override it using:

```
PORT=3001 node server.js
```

### API documentation:

for API documentation hit:

```
http://localhost:<your_port>/api-docs
```


## Start server using docker:

```
docker pull iamprathamesh/codify-indi
docker run -it -p <your_system_port>:<port_you_specified or default_3000> <Id_of_docker_image>
```


## Use development server:

Alternatively, you can directly use the development server on:

```
http://http://13.235.133.138:3000/api-docs
```
