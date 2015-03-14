module.exports = {


  friendlyName: 'ECS list tasks',


  description: 'Returns a list of tasks for a specified cluster. ',


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
      description: 'The short name or full Amazon Resource Name (ARN) of the cluster that hosts the tasks you want to list. Defaults to `default`',
      example: 'default'
    },

    family: {
      description: 'The full family name that you want to filter the ListTasks results with.',
      example: 'aFamily'
    },

    nextToken: {
      description: 'The nextToken value returned from a previous paginated ListTasks request where maxResults was used and the results exceeded the value of that parameter.',
      example: 'aTokenValue'
    },

    maxResults: {
      description: 'The maximum number of task definition results returned by ListTasks in paginated output.',
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
        taskArns: [
          'arn:aws:ecs:us-west-2:575431834730:task/55b9b3b1-f189-4e5e-9e3a-83832c69b57e'
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

    var params = {
      cluster: inputs.cluster || 'default'
    };

    if(inputs.family) params.family = inputs.family;
    if(inputs.nextToken) params.nextToken = inputs.nextToken;
    if(inputs.maxResults) params.maxResults = inputs.maxResults;

    ecs.listTasks(params, function(err, data) {
      if(err) {
        return exits.error(err);
      }

      exits.success(data);
    });

  }

};
