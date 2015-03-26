module.exports = {


  friendlyName: 'Stop ECS task',


  description: 'Stop a running ECS task.',


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

    task: {
      description: 'The task UUIDs or full Amazon Resource Name (ARN) entry of the task you would like to stop.',
      example: 'arn:aws:ecs:us-west-2:575231334330:task-definition/taskName:1',
      required: true
    },

    cluster: {
      description: 'The short name or full Amazon Resource Name (ARN) of the cluster that hosts the task you want to stop. Defaults to `default`',
      example: 'default'
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
        task: {
          clusterArn: 'arn:aws:ecs:us-west-2:575431834730:cluster/default',
          containerInstanceArn: 'arn:aws:ecs:us-west-2:575431834730:container-instance/98950f3c-7347-4249-99cb-168832a1b8f2',
          containers: [{
            containerArn: 'arn:aws:ecs:us-west-2:575431834730:container/23cb1b84-0d02-4a85-a672-7a2b1c0410d7',
            lastStatus: 'RUNNING',
            name: 'preview',
            networkBindings: [{
              bindIP: '0.0.0.0',
              containerPort: 1337,
              hostPort: 49156
            }],
            taskArn: 'arn:aws:ecs:us-west-2:575431834730:task/55b9b3b1-f189-4e5e-9e3a-83832c69b57e'
          }],
          desiredStatus: 'STOPPED',
          lastStatus: 'RUNNING',
          overrides: {
            containerOverrides: [{
              name: 'preview'
            }]
          },
          taskArn: 'arn:aws:ecs:us-west-2:575431834730:task/55b9b3b1-f189-4e5e-9e3a-83832c69b57e',
          taskDefinitionArn: 'arn:aws:ecs:us-west-2:575431834730:task-definition/particlebanana-2Factor:1'
        }
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
      task: inputs.task,
      cluster: inputs.cluster || 'default'
    };

    ecs.stopTask(params, function(err, data) {
      if(err) {
        return exits.error(err);
      }

      exits.success(data);
    });

  }

};
