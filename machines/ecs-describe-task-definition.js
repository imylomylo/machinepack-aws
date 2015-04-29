module.exports = {


  friendlyName: 'Describe ECS task definition',


  description: 'Describe an ECS task definition ',


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
      description: 'The ECS task definition describe',
      example: 'arn:aws:ecs:us-west-2:595131534720:task-definition/my-cool-task',
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
        taskDefinition: {
          containerDefinitions: [{
            cpu: 1,
            environment: [{
              name: 'ENV_VAR',
              value: 'some value'
            }],
            essential: true,
            image: 'myDockerImage',
            memory: 256,
            mountPoints: [],
            name: 'microservices',
            portMappings: [{
              containerPort: 1337,
              hostPort: 0
            }],
            volumesFrom: []
          }],
          family: 'my-cool-task',
          revision: 1,
          taskDefinitionArn: 'arn:aws:ecs:us-west-2:595131534720:task-definition/my-cool-task',
          volumes: []
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
      taskDefinition: inputs.taskDefinition
    };

    ecs.describeTaskDefinition(params, function(err, data) {
      if(err) {
        return exits.error(err);
      }

      exits.success(data);
    });

  },



};
