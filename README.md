# Cerebellum CLI

Cerebellum is a drop-in infrastructure for serverless real-time applications. The Cerebellum CLI tool is used to deploy the ready-made infrastructure to AWS with just a few simple commands. Cerebellum's preconfigured [WebSocket Server](https://github.com/Capstone2408-Team-2/server.git) is the default configuration for simple and efficient time-to-deployment with the [Cerebellum SDK](https://github.com/Capstone2408-Team-2/clientLibrary.git). If you prefer, you can use your own backend server by providing your image when prompted.

<!-- toc -->

- [`Usage`](#usage)
- [`Getting Started`](#getting-started)
- [`FAQ`](#faq)
- [`Commands`](#commands)

<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g @cerebellum/cli
$ cerebellum COMMAND
running command...
$ cerebellum (--version)
@cerebellum/cli/1.0.2 darwin-arm64 node-v20.11.0
$ cerebellum --help [COMMAND]
USAGE
  $ cerebellum COMMAND
...
```

<!-- usagestop -->

# Getting Started

<!-- gettingstarted-->

### Prerequisites

- an AWS account has been [created](https://aws.amazon.com/account/)
- an AWS IAM role has been [created](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-set-up.html) with given `AdministratorAccess` permissions
  - the Access Key and Secret Access Key are required to connect to AWS
- `npm` is [installed](https://docs.npmjs.com/cli/v10/commands/npm-install)
- AWS CLI is [installed](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and configured
- AWS CDK is [installed](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html)
- SSL/TLS certificate has been validated and issued using [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/)

### Installation

- run `npm install -g @cerebellum/cli`
- type `cerebellum --help` to see the available commands

### First Time Usage

Once installed, the `cerebellum` commands can be run by executing `cerebellum <command>` in your terminal.

For further detail on each command, type `cerebellum <command> --help` in the terminal.

Upon executing `cerebellum init` or `cerebellum create`, you will be prompted to provide some configurations for deployment:

- Your AWS Access Key
- Your AWS Secret Access Key
- Your preferred AWS region
- AWS description (can leave blank)
- Your dockerized image (if you intend to use your own server)
- Your validated SSL/TLS certificate ARN from AWS Certificate Manager
- Maximum and minimum number of concurrent remote servers for scaling up and down
  - Your infrastructure will automatically scale down to the minimum number of servers on low load
  - Your infrastructure will automatically scale up as the load increases until it reaches the approved maximum

<!-- gettingstartedstop -->

# FAQ

<!-- faq -->

### I canceled the `cerebellum create` (or `cerebellum init`) command while the infrastructure was still deploying, and now it won't let me redeploy. How can I fix this?

- The infrastructure will continue to deploy, even if you cancel the command during deployment. You may check in your [CloudFormation](https://aws.amazon.com/cloudformation/) in the AWS console to see the logs.

### I have been waiting for a really long time and it is still deploying. Is something wrong?

- Deployments to AWS can take up to 30 minutes. There is a lot of work AWS has to do behind the scenes to provision new resources or to drain existing resources.
- To troubleshoot, log in to your AWS console and check the logs in your [CloudFormation](https://aws.amazon.com/cloudformation/). You will be able to discern which resource is holding up the deployment. Then, you may navigate to that resource and check its logs to further investigate.

### I want to cancel my deployment, but it is still updating or deploying. How can I do this?

- If there are any errors, or if you wish to cancel the deployment, you can force delete the stack from [CloudFormation](https://aws.amazon.com/cloudformation/) in the AWS console.

### Does Cerebellum apply identifiers to the infrastructure that gets spun up by the CLI?

- Everything deployed using `cerebellum create` or `cerebellum init` has `Cerebellum` as a prefix on its identifier. You can change these manually in the CDK if you wish, but make sure they are uniquely named.

<!-- faqstop-->

# Commands

<!-- commands -->

- [`cerebellum create`](#cerebellum-create)
- [`cerebellum destroy`](#cerebellum-destroy)
- [`cerebellum init`](#cerebellum-init)

## `cerebellum create`

Create a new directory, initialize the CDK project, and deploy infrastructure to AWS

```
USAGE
  $ cerebellum create

DESCRIPTION
  Create a new directory, initialize the CDK project, and deploy infrastructure to AWS
```

## `cerebellum init`

Initialize the CDK project in current directory and deploy infrastructure to AWS

```
USAGE
  $ cerebellum init

DESCRIPTION
  Initialize the CDK project in current directory and deploy infrastructure to AWS
```

## `cerebellum destroy`

Destroy the infrastructure (delete stack from AWS)

```
USAGE
  $ cerebellum destroy

DESCRIPTION
  Destroy the infrastructure (delete stack from AWS)
```

<!-- commandsstop -->
