# fun-and-profit

This repo contains some basic Slack bots and Slack apps to get you started. Not a lot of error handling or robustification
going on, just the basics to get you off the ground.

## Examples

All examples are found under the `examples/` directory.

### 01

A bare-bones, single-team Slack bot built using `request` and `ws`. Not a lot of error handling or fancy things, but it does the job.

### 02

A refactored version of the first Example to help us focus on building "interaction first."

### 03

A bot built using `botkit`. More robust error handling, but no reconnection logic if the RTM connection goes down.

### 04

A single-team Slack bot written with Skellington. Will attempt to reconnect to the RTM API if disconnected, much more
robust error handling. Much less code.

### 05

A bare-bones Slack app build using `express`, `request`, and `ws`. Adds a bot to your team listening and responding
via the RTM API and a slash command that will reply privately. If the app restarts, the OAuth token will be lost and 
you will need to re-add the app to your team.

### 06

The same Slack app as 04, but built using Botkit's convenience methods. Again, not much error handling or reconnection
logic. If the app restarts, the OAuth token will be lost and you will need to re-add the app to your team.

### 07

A Slack app written with Skellington. Will attempt to reconnect to the RTM API if disconnected in addition to other error
handling. Will keep track of OAuth tokens and will reconnect your bot to each team if your process stops.

## Running Examples

You will need a few env vars to run the example bots:
 - SLACK_TOKEN: A bot token for a single-team bot.
 - CLIENT_ID: The client ID provided by Slack for a Slack app.
 - CLIENT_SECRET: The client secret provided by Slack for your Slack app.

Run `npm install` to install dependencies. To run an example run `npm run bot <example>`. For example, to run example 01, 
you would type `npm run bot 01`.
