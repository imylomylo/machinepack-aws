module.exports = {


  friendlyName: 'EC2 describe instances',


  description: 'Describes one or more of your instances.',


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

    instanceIds: {
      description: 'One or more instance IDs.',
      example: ['STRING'],
      required: true
    },

    nextToken: {
      description: 'The token for the next set of items to return.',
      example: 'aTokenValue'
    },

    maxResults: {
      description: 'The maximum number of items to return for this call.',
      example: 100
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      description: 'Done.',
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
    var ec2 = new AWS.EC2(config);

    var params = {
      InstanceIds: inputs.instanceIds
    };

    if(inputs.nextToken) params.NextToken = inputs.nextToken;
    if(inputs.maxResults) params.MaxResults = inputs.maxResults;

    ec2.describeInstances(params, function(err, data) {
      if(err) {
        return exits.error(err);
      }

      exits.success(data);
    });


  },



};
