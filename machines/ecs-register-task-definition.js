module.exports = {


  friendlyName: 'ECS register task definition',


  description: 'A task definition is required to run an ECS task.',


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

    family: {
      description: 'The ECS family name',
      example: 'aFamily',
      required: true
    },

    containerDefinitions: {
      description: 'Describes what the new container will look like',
      example: "JSON encoded containerDefinitions",
      required: true
    },

    volumes: {
      descriptions: 'Volumes to be mapped.',
      example: [{
        host: {
          sourcePath: 'STRING_VALUE'
        },
        name: 'STRING_VALUE'
      }]
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    invalidContainerDefinitions: {
      description: 'The container definition must be a valid strigified json object'
    },

    success: {
      description: 'Done.',
      example: {
        taskDefinition: {
          containerDefinitions: [{
            cpu: 1,
            environment: [{
              name: 'ENV_NAME',
              value: 'ENV_VALUE'
            }],
            essential: true,
            image: 'docker/imageName',
            memory: 256,
            mountPoints: [],
            name: 'aName',
            portMappings: [{
              containerPort: 80,
              hostPort: 0
            }],
            volumesFrom: []
          }],
          family: 'taskName',
          revision: 1,
          taskDefinitionArn: 'arn:aws:ecs:us-west-2:575231334330:task-definition/taskName:1',
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
      family: inputs.family
    };

    if(inputs.volumes) params.volumes = inputs.volumes;

    var containerDef;
    try {
      containerDef = JSON.parse(inputs.containerDefinitions);
    } catch (e) {
      return exits.invalidContainerDefinitions
    }

    params.containerDefinitions = containerDef
    if(!Array.isArray(params.containerDefinitions)) {
      params.containerDefinitions = [containerDef];
    }

    ecs.registerTaskDefinition(params, function(err, data) {
      if(err) {
        return exits.error(err);
      }

      exits.success(data);
    });
  }

};
