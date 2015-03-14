module.exports = {


  friendlyName: 'ECS list task definitions',


  description: 'Returns a list of task definitions that are registered to your account.',


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

    familyPrefix: {
      description: 'The full family name that you want to filter the ListTaskDefinitions results with.',
      example: 'aFamily'
    },

    nextToken: {
      description: 'The nextToken value returned from a previous paginated ListTaskDefinitions request where maxResults was used and the results exceeded the value of that parameter.',
      example: 'aTokenValue'
    },

    maxResults: {
      description: 'The maximum number of task definition results returned by ListTaskDefinitions in paginated output.',
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
      example: {
        taskDefinitionArns: [
          'arn:aws:ecs:us-west-2:573433844230:task-definition/taskName:1'
        ]
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

    var params = {};
    if(inputs.familyPrefix) params.familyPrefix = inputs.familyPrefix;
    if(inputs.nextToken) params.nextToken = inputs.nextToken;
    if(inputs.maxResults) params.maxResults = inputs.maxResults;

    ecs.listTaskDefinitions(params, function(err, data) {
      if(err) {
        return exits.error(err);
      }

      exits.success(data);
    });

  }

};
