module.exports = {


  friendlyName: 'Run ECS task',


  description: 'Start a task using random placement and the default Amazon ECS scheduler.',


  extendedDescription: '',


  inputs: {

    accessKeyId: {
      description: 'AWS IAM user access key id.',
      example: 'akid',
      required: true
    },

    secretAccessKey: {
      description: 'AWS IAM user secret access key',
      example: 'secret',
      required: true
    },

    region: {
      description: 'Which region to use. Defaults to us-west-2',
      example: 'us-west-2'
    },

    apiVersion: {
      description: 'Which api version to use. Defaults to: latest',
      example: '2014-11-13'
    },

    taskDefinition: {
      description: 'A registered task definition on ECS that will be used to start a task.',
      example: 'arn:aws:ecs:us-west-2:577431834720:task-definition/taskName:1',
      required: true
    },

    cluster: {
      description: 'Which cluster to run the task on. Defaults to `default`',
      example: 'myCluster'
    },

    count: {
      description: 'How many containers to run. Defaults to 1.',
      example: 1
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      description: 'Done.',
      example: {
        failures: [],
        tasks: [{
          clusterArn: 'arn:aws:ecs:us-west-2:575431834730:cluster/default',
          containerInstanceArn: 'arn:aws:ecs:us-west-2:575431834730:container-instance/98950f3c-7347-4249-99cb-168832a1b8f2',
          containers: [{
            containerArn: 'arn:aws:ecs:us-west-2:575431834730:container/23cb1b84-0d02-4a85-a672-7a2b1c0410d7',
            lastStatus: 'PENDING',
            name: 'preview',
            taskArn: 'arn:aws:ecs:us-west-2:575431834730:task/55b9b3b1-f189-4e5e-9e3a-83832c69b57e'
          }],
          desiredStatus: 'RUNNING',
          lastStatus: 'PENDING',
          overrides: {
            containerOverrides: [{
              name: 'container'
            }]
          },
          taskArn: 'arn:aws:ecs:us-west-2:575431834730:task/55b9b3b1-f189-4e5e-9e3a-83832c69b57e',
          taskDefinitionArn: 'arn:aws:ecs:us-west-2:575431834730:task-definition/containerName:1'
        }]
      }
    },

  },


  fn: function (inputs,exits) {

    // Dependencies
    var AWS = require('aws-sdk');

    var config = {
      accessKeyId: inputs.accessKeyId,
      secretAccessKey: inputs.secretAccessKey,
      region: inputs.region || 'us-west-2',
      apiVersion: inputs.apiVersion || 'latest'
    };

    // Construct the ECS Service
    var ecs = new AWS.ECS(config);

    var params = {
      taskDefinition: inputs.taskDefinition,
      cluster: inputs.cluster || 'default',
      count: inputs.count || 1
    };

    ecs.runTask(params, function(err, data) {
      if(err) {
        return exits.error(err);
      }

      exits.success(data);
    });

  }

};
