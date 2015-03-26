module.exports = {


  friendlyName: 'Describe ECS tasks',


  description: 'Describe a specified task or tasks.',


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

    cluster: {
      description: 'The short name or full Amazon Resource Name (ARN) of the cluster that hosts the container instances you want to describe. Defaults to `default`.',
      example: 'default'
    },

    tasks: {
      description: 'Task UUIDs or full Amazon Resource Name (ARN) entries.',
      example: ['98950f3c-7347-4249-99cb-168832a1b8f2'],
      required: true
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
            containerArn: 'arn:aws:ecs:us-west-2:575431834730:container/7a335481-599e-4a97-8032-161f9e19b26f',
            lastStatus: 'RUNNING',
            name: 'preview',
            networkBindings: [{
              bindIP: '0.0.0.0',
              containerPort: 1337,
              hostPort: 49157
            }],
            taskArn: 'arn:aws:ecs:us-west-2:575431834730:task/903ba554-510a-4565-99bc-f70c3b2edaed'
          }],
          desiredStatus: 'RUNNING',
          lastStatus: 'RUNNING',
          overrides: {
            containerOverrides: [{
              name: 'preview'
            }]
          },
          taskArn: 'arn:aws:ecs:us-west-2:575431834730:task/903ba554-510a-4565-99bc-f70c3b2edaed',
          taskDefinitionArn: 'arn:aws:ecs:us-west-2:575431834730:task-definition/particlebanana-2Factor:1'
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
      cluster: inputs.cluster || 'default',
      tasks: inputs.tasks
    };

    ecs.describeTasks(params, function(err, data) {
      if(err) {
        return exits.error(err);
      }

      exits.success(data);
    });

  }

};
