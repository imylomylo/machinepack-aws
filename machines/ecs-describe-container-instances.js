module.exports = {


  friendlyName: 'ECS describe container instances',


  description: 'Describes Amazon EC2 Container Service container instances',


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

    containerInstances: {
      description: 'Container instance UUIDs or full Amazon Resource Name (ARN) entries to describe.',
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
        containerInstances: [{
          agentConnected: true,
          containerInstanceArn: 'arn:aws:ecs:us-west-2:575431834730:container-instance/98950f3c-7347-4249-99cb-168832a1b8f2',
          ec2InstanceId: 'i-783acf77',
          registeredResources: [{
            doubleValue: 0,
            integerValue: 4096,
            longValue: 0,
            name: 'CPU',
            type: 'INTEGER'
          }],
          remainingResources: [{
            doubleValue: 0,
            integerValue: 4096,
            longValue: 0,
            name: 'CPU',
            type: 'INTEGER'
          }],
          status: 'ACTIVE'
        }],
        failures: []
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
      containerInstances: inputs.containerInstances
    };

    ecs.describeContainerInstances(params, function(err, data) {
      if(err) {
        return exits.error(err);
      }

      exits.success(data);
    });

  }

};
