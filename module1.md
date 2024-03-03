# Node.js Introduction

Runs on V8 engine outside the browser
implements non-blocking I/O, event-drive model

features

- single threaded
- non-blocking I/O model
- JS everywhere paradigm
- new ES standards
- package ecosystem (npm)
- unified API

Node.js Frameworks and Tools

- Express
- NestJS
- Fastify
- Socket.io
- AdonisJS

## V8 Engine

C++ based, developed by google. Doesn't produce intermediate code and uses JIT. Other JS engines are spidemonkey(firefox), chakraCore (previously by edge), JavaScriptCore(by Safari). Just-in-Time (JIT) compilation was created to overcome this challenge with dynamic languages, combining aspects of both interpretation and compilation. With JIT compilation, the V8 engine performs an interpretation step that runs before the compilation step, detects frequently used code and functions, and compiles them using information from prior executions. During compile time, this code is re-compiled for optimal performance.

## NVM

install and manage multiple versions of Node.js on a single local environment
`nvm list`
`nvm install 16.17.0`
`nvm use 16.17.0`
To avoid specifying Node.js version manually every time when we need to change it, we can create .nvmrc file in out project:
`v16.15.0`
This will allow you to use nvm install command in root of the project to install Node.js version specified in this file.

## Node.js event loop

non blocking I/O is achieved in node.js using reactor pattern and event loop.

### Reactor Pattern

Components are Event Demultiplexer, Event loop and Event Queue.

There is no real world component named event demultiplexer. It is implemented through libuv in node.

### Thread Pool

Thread pool (a part of libuv) was introduced to support I/O operations that cannot be directly addressed by hardware asynchronous I/O utils. They are fs and DNS lookup. For example certain systems, such as Linux does not support complete asynchrony for file system access. That affects dns.lookup() operation since it tries to access system configuration files.

### Event Queue

4 macro tasks queues

Expired timers and intervals Queue:timeout and interval
I/O events queue: I/O
Immediate Queue: immediate
Close Handlers Queue:close event callbacks

2 micro task queues

next ticks queue: process.nextTick()
other microtasks queue: resolved promises

### Event Loop

6 phases in event loop:

1. Timers: execute callback for Expired timers and intervals Queue
2. Pending callback: I/O callback
3. Idle, Prepare: housekeeping activities
4. Poll: I/O callback polls
5. check: immediate queue
6. close handler queues callbacks

micro tasks queues have higher priority than macro tasks. They are checked after each phase of the Event Loop

### NPM

online repository and cli tool for installing and managing packages

Manifest file:package.json

With npx you can execute your package without installation

### REPL (Read, Eval, Print, Loop)
